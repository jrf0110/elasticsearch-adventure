# ElasticSearch Adventure!

<script src="http://esadv.j0.hn/ace.js"></script>
<script src="http://esadv.j0.hn/mode-javascript.js"></script>
<script src="http://esadv.j0.hn/theme-github.js"></script>
<script src="http://esadv.j0.hn/app.js"></script>

<style>
  .code-editor {
    position: relative;
    width: 100%;
    height: 400px;
  }
</style>

Enter your name: <input type="text" id="esadv-name" class="esadv-data-name esadv-in" placeholder="Enter your Name" />

You're tasked with setting up robust searching capabilities on a few of your API's resources. Your colleague told you that [elasticsearch](http://www.elasticsearch.org/) is the way to go. Reading the documentation, you exclaim, "holy cow! This looks easy. I can just throw JSON at my ES instance and then I can start searching." Though your optimism will soon be stifled by the challenges yet unseen.

## Chapter 1: Installing ElasticSearch

Bleary-eyed engineers walk into the meeting room at 9:12am. Morning stand-up has begun. "<span class="esadv-data-name"></span>, what are you tasked with today?" the team lead asks. You respond, "well, we need to get some solid search capabilities on our core API. [Elasticsearch](http://www.elasticsearch.org/) was recommended to me and it looks great. Companies like [foursquare](https://foursquare.com) and [github](http://github.com) use it. From the looks of it, I can use an existing node.js module to integrate. I'm going to need to get the following done:"

* Integrate ES with our existing environment
* Write a script that will migrate existing data to ES
* Write Unit Tests for API endpoints and flows
* Ensure that when our API resources are created, updated, or deleted, ES is updated as well

It should take me about <input type="text" id="esadv-estimate" class="esadv-data-estimate esadv-in" placeholder="Enter your estimate" /> days.

<span class="esadv-path esadv-path-estimate esadv-path-estimate-impossible">
  "<span class="esadv-data-name"></span>, please start making some god damn sense. It's too early for your antics."
</span>
<span class="esadv-path esadv-path-estimate esadv-path-estimate-unreasonably-short">
  "<span class="esadv-data-name"></span>, do you really think it will be that easy? I think <span class="esadv-data-estimate"></span> days is cutting it a little close. It might be harder than you think."
</span>
<span class="esadv-path esadv-path-estimate esadv-path-estimate-reasonable">
  "Hrmmm <span class="esadv-data-estimate"></span> days? Alright, <span class="esadv-data-name"></span>, that sounds good"
</span>
<span class="esadv-path esadv-path-estimate esadv-path-estimate-unreasonably-long">
  "Maybe we should re-evaluate who's going to be implementing this feature. Is anyone in the office capable of implementing [Elasticsearch](http://www.elasticsearch.org/) in less than <span class="esadv-data-estimate"></span> days?"
</span>

After stand-up, you go to your desk and start reading the documentation for ElasticSearch. "Ok, let's download this thing"


    curl https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.2.tar.gz | tar xz


You see that documentation says to run the elasticsearch file in the bin folder with the flag -f


    cd elasticsearch-0.90.2/
    ./bin/elasticsearch -f


You know everything is working when you see the following output:


    [2013-07-21 21:51:20,771][INFO ][node                     ] [Phoenix] {0.90.2}[24289]: initializing ...
    [2013-07-21 21:51:20,777][INFO ][plugins                  ] [Phoenix] loaded [], sites []
    [2013-07-21 21:51:22,784][INFO ][node                     ] [Phoenix] {0.90.2}[24289]: initialized
    [2013-07-21 21:51:22,784][INFO ][node                     ] [Phoenix] {0.90.2}[24289]: starting ...
    [2013-07-21 21:51:22,878][INFO ][transport                ] [Phoenix] bound_address {inet[/0:0:0:0:0:0:0:0%0:9301]}, publish_address {inet[/192.168.11.9:9301]}
    [2013-07-21 21:51:25,984][INFO ][cluster.service          ] [Phoenix] detected_master [Lady Killer][-CBpQzz0Sm6Crvjqutttrg][inet[/192.168.11.9:9300]], added {[Lady Killer][-CBpQzz0Sm6Crvjqutttrg][inet[/192.168.11.9:9300]],}, reason: zen-disco-receive(from master [[Lady Killer][-CBpQzz0Sm6Crvjqutttrg][inet[/192.168.11.9:9300]]])
    [2013-07-21 21:51:26,048][INFO ][discovery                ] [Phoenix] elasticsearch/cpkebW_qRSOWgn9Zxmkpog
    [2013-07-21 21:51:26,053][INFO ][http                     ] [Phoenix] bound_address {inet[/0:0:0:0:0:0:0:0%0:9201]}, publish_address {inet[/192.168.11.9:9201]}
    [2013-07-21 21:51:26,053][INFO ][node                     ] [Phoenix] {0.90.2}[24289]: started


Just ensure everything is in working order, you decide to make your first request to ES. You read somewhere in the guide that you could add ```?pretty=true``` to any request to format the result.


    curl localhost:9200/_cluster/nodes/_local?prety=true





    //language: javascript;
    {
      "ok" : true,
      "cluster_name" : "elasticsearch",
      "nodes" : {
        "-CBpQzz0Sm6Crvjqutttrg" : {
          "name" : "Lady Killer",
          "transport_address" : "inet[/192.168.11.9:9300]",
          "hostname" : "John-Fawcetts-MacBook-Pro.local",
          "version" : "0.90.2",
          "http_address" : "inet[/192.168.11.9:9200]"
        }
      }
    }

## Chapter 2: Adding Some Data

With ES running on port 9300, you decide that it may be best to take a step back and actually learn some basics of your new tool. You find that [Indices](http://www.elasticsearch.org/guide/reference/glossary/#index) are basically databases, [Types](http://www.elasticsearch.org/guide/reference/glossary/#type) are like tables, and [Documents](http://www.elasticsearch.org/guide/reference/glossary/#document) are rows. Naturally, you think you should create an index of each of your environments: prod, staging, and dev.

You surmise from the documentation that ES uses the following URL scheme for document storage


    http://localhost:9200/{index}/{type}/{id}


You also see from the [Index API](http://www.elasticsearch.org/guide/reference/api/index_/) that when a document is saved, ES will automatically create the index you're attempting to save into. So performing the following command:


    curl -XPUT 'http://localhost:9200/twitter/tweet/1' -d '{'

<div id="editor-1" class="code-editor"></div>


    '}'