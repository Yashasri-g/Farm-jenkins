pipeline {
    agent any

    environment {
        IMAGE = "7396444674/app"
        TAG = "${BUILD_NUMBER}"
        CONTAINER = "my-app"
        EC2 = "13.204.95.170"
    }

    stages {

        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE:$TAG .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $IMAGE:$TAG
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2 "
                        docker pull $IMAGE:$TAG &&
                        docker stop $CONTAINER || true &&
                        docker rm $CONTAINER || true &&
                        docker run -d -p 80:8000 --name $CONTAINER $IMAGE:$TAG
                    "
                    '''
                }
            }
        }
    }
}