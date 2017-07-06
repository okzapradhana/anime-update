const express = require('express');
const router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/update', function(req, res){
    let url = 'https://www.samehadaku.net/';
    request(url, function (error, response, body) {
        if (!error) {

            let $ = cheerio.load(body)
            let datas = {
                title: [],
                link: [],
                date: []
            };
            $('#main-content').each((i, value) => {

                $(value).find('article').each((j, data) => {
                    // res.send($(data).html());
                    $(data).find('.entry-title').each((k, valu) => {
                        datas.title.push((($(valu).text()).replace('\n\t\t\t\t\n\t\t\t\t\t', '').replace('\t\t\t\t\n\t\t\t', '')))
                        datas.link.push(($(valu).find('a').attr('href')))
                    })
                    $(data).find('.mh-meta').each((k, valu) => {
                        datas.date.push(($(valu).find('span').text()).replace('samehadaku0', ''))
                    })
                });
            });
            res.send(datas)
        } else {
            console.log('error' + error)
        }
    })
})

module.exports = router;