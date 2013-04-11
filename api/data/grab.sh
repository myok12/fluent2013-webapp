tmp_file=section
echo
echo "Grabbing the section"
curl http://cms-service.prd.nytimes.com/data/feeds/outgoing/mobile/v1/json/mobile-web/homepage.json > $tmp_file
echo
echo "Extracting content"
node extract_article.js $tmp_file

rm $tmp_file
