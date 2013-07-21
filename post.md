# ElasticSearch Adventure!

<script src="esadv.j0.hn/app.js"></script>

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