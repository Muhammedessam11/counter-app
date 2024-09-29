pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('Dockerhub')  // Jenkins credentials ID
        DOCKER_IMAGE = 'mohamedessam1911/counter-app:latest'
        KUBECONFIG_CREDENTIALS = credentials('k8s')  // Jenkins credentials ID for kubeconfig
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t mohamedessam1911/weather-app:latest .'
                }
            }
        }
        
        stage('Docker Login') {
            steps {
               sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push mohamedessam1911/weather-app:latest'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh '''
                        docker run -d -p 3000:3000 --name weather-app mohamedessam1911/weather-app:latest
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
