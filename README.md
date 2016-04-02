## Data Visualization: U.S. Domestic Airline On-time Performance from 2003 to 2015
by Chun Zhu

### Summary

This chart visualizes 5 top U.S. domestic airlines' on-time arrival performance from 2003 to 2015. It illustrates the on-time performance of various airlines over time, and which airlines were currently performing the best.  It also shows the general trends that all 5 airlines experienced: a marked dip in performance from 2006 to 2007, individual peaks from 2011 to 2012, and a more recent decline from 2012 to 2014. A flight is considered delayed when it arrived 15 or more minutes than the schedule.

### Design

#### Exploratory Data Analysis and Cleaning (R)

The flight performance data was downloaded from [RITA]( http://www.transtats.bts.gov/OT_Delay/OT_DelayCause1.asp), which includes all domestic flights from all carriers from June 2003 to January 2016. EDA  was done with Rstudio. The underlying hypothesis is that there might be trends for individual airline performance given by the percentage of on-time flights. So line charts with multiple series representing airline on-time flights rate would best serve the purpose. In Rstudio I first produced a line chart faceted by airlines as seen below:

![Initial R Plot](https://github.com/happychun85/P5-Data-Visualization/blob/master/images/R_all_airlines.png)

The plot looks very crowded and so hard to distinguish different airlines. Moreover, the plot is on a monthly basis which shows drastic fluctuations along the lines. So I truncated the data to 80th quantile to get the top 6 airlines with the highest gross number of flights on a monthly basis.  Another problem in the above plot is that the on-time rate was calculated on a monthly basis which shows drastic fluctuations along the lines. So I averaged the flight on-time rate on a yearly basis. Plotting this updated dataset gave a better visualization of the performance of top airlines over time:

![Second R Plot]( https://github.com/happychun85/P5-Data-Visualization/blob/master/images/R_top_6airlines_2003_2016.png)

Clearly something is not right on the year 2016, that’s because the dataset only contains January data of 2016. So I removed the 2016’s data from the dataset. I also noticed that the American Eagle Airlines did not show up in 2015, which turned out that the brand name of American Eagle was discontinued in 2014. So I removed American Eagle’s data too. Now the plot seems much better:

![third R Plot]( https://github.com/happychun85/P5-Data-Visualization/blob/master/images/R_top_5airlines_2003_2015.png)

Since people are more interested in the question, “which airline is more likely to be on time?” I decided to display the performance trends rather than gross number of flights.

#### Data Visualization (d3.js and dimple.js)

I replicated the above plot of airline performance using d3.js and dimple.js. And I particularly improved the data visualization by adding a mouse-over event to improve interaction. So when the mouse is moved over the line, the line will pop out and become bold to attract attention.

This initial plot can be viewed at `index_initial.html`, or below:

![First Chart]( https://github.com/happychun85/P5-Data-Visualization/blob/master/images/initial_plot.png)

### Feedback

I asked my three friends who are not familiar with this dataset for their feedback, and listed the highlighted comments as below:

#### Feedback 1

- It is really cool that the line pops out when I hoover over the line. But the legend seems too crowded and small which makes it hard to read. 

- When a line was selected, it took me some time to find out the corresponding airline by comparing the colors in the legend. I think emphasizing the individual airline legend when you select the line in the chart should be a good idea.

#### Feedback 2

- Wow, it seems that I should take Delta Airline when I plan my trip!

- The line colors are nice and comfortable to the eyes. However, the gridlines sometimes distracted my attention when I looked at the trend lines.

#### Feedback 3

- A nice and clean interactive chart! 

- The interaction allows me to select and highlight one line at a time. What if I want to compare the performance of 2 airlines?

### Final

Based on the feedback, I implemented the following changes:

- I resized the legend and made the font larger.
- I added another interaction: when the mouse is moved over a line, the corresponding legend pop out as well as the line itself.
- I subdued the grid lines.
- I added one more interaction: manually select lines by clicking the legend.  By looking at the dimple.js example listed in the resources, I was able to realize this function.

This final plot can be viewed at `index_final.html`, or below:

![Final Chart]( https://github.com/happychun85/P5-Data-Visualization/blob/master/images/final_plot.png)

### Resources

- [dimple.js Documentation](http://dimplejs.org/)
- [d3.js Documentation]( https://github.com/mbostock/d3/wiki/API-Reference)
- [Interactive Legend - Dimple]( http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends)

### Data

- `data/ 620069953_12016_3132_airline_delay_causes.csv`: original downloaded dataset including all airline performance data from June 2003 to January 2016.
- `data/data.csv`: cleaned and truncated dataset, including only the top 5 airlines from June 2003 to Dec 2015.
