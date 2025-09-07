pipeline {
    agent any

    environment {
        APP_NAME = "react-app"
        DOCKER_IMAGE = "react-app-local"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Cloning repository..."
                git branch: 'main', url: 'https://github.com/malak-y/Movie-app'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploying container..."
                sh """
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d -p 3000:80 --name ${APP_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }
    }

    post {
        success {
            echo "✅ React app deployed locally with Docker!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
