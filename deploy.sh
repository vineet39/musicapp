cd /Users/[path/to/your/react/project/root/directory] 
echo “Building React Project …” 
npm run build  
echo “Connecting to AWS VM and copying contents of build folder to /var/www/html/ …” 
scp -i "musicapp.pem" -r build/* ubuntu@ec2-54-82-117-52.compute-1.amazonaws.com:/var/www/html
echo “Done …” 