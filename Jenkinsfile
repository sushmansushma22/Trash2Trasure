pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    triggers {
        githubPush()
    }

    environment {
        COMPOSE_PROJECT_NAME = 'trash2treasure'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Configure environment') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'trash2treasure-backend-env',
                        variable: 'BACKEND_ENV'
                    )
                ]) {
                    powershell '''
                        Write-Host "Configuring backend environment..."

                        Remove-Item -Recurse -Force "backend\\env_temp" -ErrorAction SilentlyContinue

                        New-Item -ItemType Directory -Path "backend\\env_temp" -Force | Out-Null

                        Expand-Archive `
                            -Path "$env:BACKEND_ENV" `
                            -DestinationPath "backend\\env_temp" `
                            -Force

                        $envFile = Get-ChildItem `
                            -Path "backend\\env_temp" `
                            -Filter ".env" `
                            -Recurse `
                            -File |
                            Select-Object -First 1

                        if (-not $envFile) {
                            Write-Error "ERROR: .env file was not found inside the credential ZIP."
                            exit 1
                        }

                        Copy-Item `
                            $envFile.FullName `
                            "backend\\.env" `
                            -Force

                        Write-Host ".env configured successfully."
                    '''
                }
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm --prefix backend ci'
                bat 'npm --prefix frontend ci'
            }
        }

        stage('Verify application') {
            steps {
                bat 'node --check backend\\server.js'
                bat 'npm --prefix frontend run build'
                bat 'docker compose -f docker-compose.yml config -q'
            }
        }

        stage('Build Docker images') {
            steps {
                bat 'docker compose -f docker-compose.yml build'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }

            steps {
                bat 'docker compose -f docker-compose.yml up -d --remove-orphans'
            }
        }
    }

    post {
        always {
            cleanWs(
                deleteDirs: true,
                notFailBuild: true
            )
        }

        success {
            echo '======================================'
            echo ' Trash2Treasure deployment successful!'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo ' Trash2Treasure deployment FAILED!'
            echo ' Check the Console Output above.'
            echo '======================================'
        }
    }
}