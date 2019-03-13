var querry="election";
var filter;
var startDate=0;
var endDate=0;
var toRead=10;
var page=0;

for(var read=toRead;read>0;read-=10){
    var querryURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+querry+"&fq="+filter+"&api-key=CW6DbOugxP6huQyzrGYWFPc4pna9sAT2&page="+page;
    if (startDate!=0){
        querryURL=querryURL+"&begin_date="+startDate;
    }
    if (endDate!=0){
        querryURL=querryURL+"&end_date="+endDate;
    }
    $.ajax({
        url:querryURL,
        method:"GET"
    }).then(function(response){
        var articles=response.response.docs;
        var max=10;
        if(read>10){
            max=read;
        }
        for(var i=0;i<max;i++){

            var newLine = $("<div>");
            var articleIndex=$("<div>");
            articleIndex.text(i+1);
            var articleTitle = $("<a>");
            articleTitle.attr("href",articles[i].web_url);
            articleTitle.text(articles[i].headline.main);
            var byline=$("<p>");
            if(articles[i].byline.original!=null) byline.text(articles[i].byline.original);
            else byline.text("By "+articles[i].section_name+" at "+articles[i].source);
            newLine.append(articleIndex);
            newLine.append(articleTitle);
            $(".top-articles").append(newLine);   
            $(".top-articles").append(byline);
            console.log(byline.text());
        }
    });
    page++;
}