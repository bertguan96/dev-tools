rm -rf dist.zip
rm -rf dist
npm run build
zip -r dist.zip dist/
scp dist.zip root@114.55.97.220:/home/data