pipeline {
    agent any
    
     environment {
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub')
        KUBECONFIG_CREDENTIALS = credentials('k8s')
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t mohamedessam1911/counter-app:latest .'
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
                    sh 'docker push mohamedessam1911/counter-app:latest'
                }
            }
        }
        
        stage('Deploy') {
               steps {
                withCredentials([file(credentialsId: 'k8s', variable: 'KUBECONFIG')]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG
                        kubectl apply -f deployment.yaml
                        kubectl apply -f service.yaml
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
