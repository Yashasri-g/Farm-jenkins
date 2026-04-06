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
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $IMAGE:$TAG
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')]) {
                    sshagent(['ec2-ssh-key']) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@$EC2 "
                            docker pull $IMAGE:$TAG &&
                            docker stop $CONTAINER || true &&
                            docker rm $CONTAINER || true &&
                            docker run -d \
                                -p 80:8000 \
                                -e MONGO_URI='$MONGO_URI' \
                                --name $CONTAINER \
                                $IMAGE:$TAG
                        "
                        '''
                    }
                }
            }
        }
    }
}
