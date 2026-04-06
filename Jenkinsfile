pipeline {
    agent any
    environment {
        BACKEND_IMAGE = "7396444674/backend"
        FRONTEND_IMAGE = "7396444674/frontend"
        TAG = "${BUILD_NUMBER}"
        EC2 = "13.204.95.170"
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    docker build -t $BACKEND_IMAGE:$TAG -f Dockerfile .
                    docker build -t $FRONTEND_IMAGE:$TAG -f frontend/Dockerfile ./frontend
                '''
            }
        }
        stage('Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $BACKEND_IMAGE:$TAG
                        docker push $FRONTEND_IMAGE:$TAG
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')]) {
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${EC2} '
                                set -e
                                mkdir -p ~/app && cd ~/app
                                export TAG=${TAG}
                                export MONGO_URI="${MONGO_URI}"
                                cat > docker-compose.yml << EOF
version: "3.9"
services:
  backend:
    image: 7396444674/backend:\${TAG}
    container_name: farm-blog-backend
    ports:
      - "8000:8000"
    environment:
      - MONGO_URI=\${MONGO_URI}
    depends_on:
      - mongodb
    restart: unless-stopped
  frontend:
    image: 7396444674/frontend:\${TAG}
    container_name: farm-blog-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
  mongodb:
    image: mongo:7
    container_name: farm-blog-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped
volumes:
  mongo_data:
EOF
                                docker-compose down || true
                                docker-compose down --remove-orphans || true
                                docker-compose pull
                                docker-compose up -d
                                
                            '
                        """
                    }
                }
            }
        }
    }
}
