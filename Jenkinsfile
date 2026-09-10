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
                    bat 'copy "%BACKEND_ENV%" backend\\.env'
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
            cleanWs(deleteDirs: true, notFailBuild: true)
        }
    }
}
