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
                    bat '''
                        echo Configuring backend environment...

                        if exist backend\\env_temp (
                            rmdir /s /q backend\\env_temp
                        )

                        mkdir backend\\env_temp

                        C:\\Windows\\System32\\tar.exe -xf "%BACKEND_ENV%" -C backend\\env_temp

                        for /r "backend\\env_temp" %%F in (.env) do (
                            copy /Y "%%F" "backend\\.env"
                        )

                        if not exist backend\\.env (
                            echo ERROR: .env file not found inside credential ZIP
                            exit /b 1
                        )

                        echo .env configured successfully.
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
            echo '======================================'
        }
    }
}