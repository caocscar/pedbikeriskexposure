# Developing Michigan Pedestrian and Bicycle Safety Models

#### Robert C. Hampshire

#### Lisa J. Molnar

#### Alex Cao

#### Yiming Cai

#### Xiao Li

#### Tayo Fabusuyi

#### The University of Michigan Transportation Research Institute

#### January 31, 2018

### Draft Final Report

# Contents

- [Acknowledgements and disclaimer](#acknowledgements-and-disclaimer)
- [Introduction](#introduction) - [Background](#background) - [Objectives](#objectives) - [Scope](#scope) - [Statement of hypotheses](#statement-of-hypotheses)
- [Literature Review](#literature-review) - [Review of previous research](#review-of-previous-research) - [Summary of state-of-the-art](#summary-of-state-of-the-art)
- [Methodology](#methodology) - [Data Sources](#data-sources) - [Michigan Traffic Crash Facts](#michigan-traffic-crash-facts) - [American Community Survey \(ACS\)](#american-community-survey-acs) - [Public Use Microdata Sample \(PUMS\)](#public-use-microdata-sample-pums) - [MI Travel Counts III \(MTC III\)](#mi-travel-counts-iii-mtc-iii) - [Reference USA](#reference-usa) - [Highway Performance Monitoring System \(HPMS\)](#highway-performance-monitoring-system-hpms) - [Exposure Model](#exposure-model) - [Unit of Analysis](#unit-of-analysis) - [Pedestrian Index of the Environment \(PIE\)](#pedestrian-index-of-the-environment-pie) - [Trip Production Model](#trip-production-model) - [Destination Choice Model](#destination-choice-model) - [Route choice](#route-choice) - [Risk Score](#risk-score) - [Experimental design](#experimental-design) - [Equipment](#equipment) - [Procedures](#procedures)
- [Findings](#findings) - [Summary of data](#summary-of-data) - [Method of analysis](#method-of-analysis) - [Walk Trip Production](#walk-trip-production) - [Destination Choice](#destination-choice) - [Presentation of results](#presentation-of-results) - [Exposure](#exposure) - [Risk Score](#risk-score-1) - [Model Validation \(10K cross validation\)](#model-validation-10k-cross-validation)
- [Discussion](#discussion) - [Validity of hypotheses](#validity-of-hypotheses) - [Factors affecting the results](#factors-affecting-the-results) - [Lack of side walk and bike lane data](#lack-of-side-walk-and-bike-lane-data) - [Lack of manual count data](#lack-of-manual-count-data) - [Limited sample size of the travel survey](#limited-sample-size-of-the-travel-survey) - [Definition of “exposure to risk”](#definition-of-%E2%80%9Cexposure-to-risk%E2%80%9D) - [Implications](#implications)
- [Conclusions](#conclusions) - [Conclusions from the study](#conclusions-from-the-study) - [Recommendations for further research](#recommendations-for-further-research) - [Implementation](#implementation) - [Validation](#validation) - [Improve Safety performance function](#improve-safety-performance-function) - [Recommendations for implementation](#recommendations-for-implementation)
- [References](#references)

<a name="acknowledgements-and-disclaimer"></a>

# Acknowledgements and disclaimer

The authors would like to thank Carissa McQuiston and Dean Kanitz from the Michigan Department of Transportation for their input and support for this project. Alex Cao was the GIS consultant for this project. Tian Tian and Yu-Hung Kuo provided support for the literature review. Brian Hilbrands developed an earlier version of the pedestrian risk score. Thank you all.

Michigan Department of Transportation and the Center for Advancing Transportation Leadership and Safety (ATLAS Center), a University Transportation Center and Collaboration between the University of Michigan Transportation Research Institute (UMTRI) and the Texas A&M Transportation Institute (TTI) sponsored by the US Department of Transportation, Research and Innovative Technology Administration (RITA) funded this research.

<a name="introduction"></a>

# Introduction

Walking is ubiquitous. Even individuals with ambulatory challenges occasionally assume the role of pedestrians. However, pedestrians are vulnerable road users. They represent a growing percentage of total traffic fatalities and injuries in Michigan and nationwide. According to the National Highway Traffic Safety Administration (NHTSA), pedestrian fatalities and pedestrian injuries have increased 12.5% and 5.7%, respectively, from 2013 to 2015 in the United States _(2)(3)_. While the number of people who walk to work within the same period in Michigan increased by 4.2% _(4-6)_ a more than proportionate increase in pedestrian fatalities was observed - 14.9%, an increase that translates to 1.71 pedestrian fatalities per 100,000 of the population in 2015, placing Michigan 19th in the nation _(7)_. This trend suggests that increased attention be placed on pedestrian safety. The present paper provides an attempt in addressing pedestrian safety by introducing a practice ready framework that incorporates a model of pedestrian exposure in measuring pedestrian crash risk.

The federal government and many state transportation agencies are adopting and advocating data driven safety analysis (DDSA) _(8)_. The stated purpose of DDSA is

“\*to analyze crash and roadway data to predict the safety impacts of highway projects allows agencies to target investments with more confidence and reduce severe crashes on the roadways”**\*.**

There are two main DDSA approaches: predictive and systematic. Predictive approaches seek to develop analytic tools to estimate the number of crashes in a specific location for certain types of roads and circumstances. Systematic approaches seek to identify the common set of underlying risk factors across of large swath of crash types. This paper uses the predictive approach for safety analysis.

The MDOT embarked on a research project to assess the crash risk to pedestrians and cyclists. Specifically, the department’s objective is the development of a robust, statewide pedestrian crash risk score. The department’s non-motorized safety engineers wanted a measure of risk that goes beyond merely counting the number of vehicle-pedestrian crashes in a given area. They wanted to understand the risk factors underlying pedestrian crashes. It is in this context that the risk score methodology presented in this paper was developed. Additionally, the HSM provides an unsatisfactory solution to measure pedestrian risk. In the HSM, the safety performance functions for vehicle-pedestrian have only vehicle and road geometry factors, but no pedestrian factors. Even SPFs specifically calibrated for Michigan _(34)_ do not consider pedestrian factors such as exposure. These factors provide the rationale for the study and the motivation for this paper.

The highway safety manual (HSM) provides the set of best practices for predictive safety analysis. Particularly, section 2c of the HSM presents predictive methods to estimate the crash frequency for many road types and circumstances. The prescribed method to predict vehicle-pedestrian crashes utilizes information about the vehicle and roadway characteristics but does not include information about pedestrian exposure. However, exposure is a critical element in prediction given that it is difficult to have a vehicle-pedestrian crash in the absence of a pedestrian.

Recognizing this limitation, we develop a pedestrian crash risk score that combines empirical Bayes methodology used by the HSM and the model of pedestrian model (MoPED) developed by Clifton et al. _(1)_. A key contribution of this paper is demonstrating how to scale MoPED and the risk score to a statewide level. We accomplish this by populating MoPED with imputed statewide multi-way tables of the household variables of interest using both the US Census Public Use Microdata Sample (PUMS) and the American Community Survey (ACS).

<a name="background"></a>

## Background

Pedestrian and bicycle-involved crashes are an emphasis area of the traffic safety community. Given the emphasis of non-motorized transportation at local, state and national level, there has been additional interest in further understanding pedestrian and bicyclist safety issues. Despite existing research and improvements, pedestrian and bicycle-involved crashes, injuries, and fatalities have remained relatively stable in Michigan. Because of this, it is important to better identify behaviors and those locations and attributes associated with locations that are most prone to such crashes.

<a name="objectives"></a>

### Objectives

Given the overarching importance of pedestrian safety particularly in urban areas, many cities and metropolitan planning organizations are devoting considerable resources towards addressing it. However, many state agencies are not able to systematically identify and compare areas of high risk for pedestrians. Relying on observed crashes or hotspot analysis can be misleading due to statistically anomalies or not properly accounting for the intensity of pedestrian travel.

1.  Document and learn from existing research on modeling/mapping pedestrian and bicycling safety areas.

2.  Gather new data on how to model/map pedestrian and bicycling crashes in Michigan.

3.  Analyze these data in order to produce a model/mapping tool that best determines locations in Michigan that could benefit from pedestrian and bicycling crash countermeasure installations.

4.  The methodologies/tool(s) will be able:


    a).  Visualize both pedestrian and bicycle crashes

    b).  Provide a risk score (based on mapping crashes and the risk characteristics mentioned above) for a defined area or network (with crash summaries)

    c).  Provide risk scores across the entire state (with crash summaries)

    d).  Provide process that results in viable output formats (GIS oriented: .kml, .dbf, .csv) and the process to add data and update regularly.

5.  Report out methodology and results of this analysis.

6.  Produce a dataset for use in a GIS tool.

<a name="scope"></a>

### Scope

This is a statewide analysis.

<a name="statement-of-hypotheses"></a>

## Statement of hypotheses

The proposed research will determine locations in Michigan that could benefit from ped/bike crash countermeasure installations. To accomplish this, we propose a method to produce a model/mapping tool that best determines locations in Michigan that could benefit from ped/bike crash countermeasures.

Pedestrian and bike crashes occur relatively infrequently over time and space. However, these crashes are often fatal when they occur. Therefore, safety analysis based on observed crashes is an inadequate and unsatisfactory way to proceed. A key hypothesis of this report is that it is possible to identify locations in need of countermeasures for pedestrian and bike crashes using a “risk score” that uses information beyond observed crashes.

<a name="literature-review"></a>

# Literature Review

<a name="review-of-previous-research"></a>

## Review of previous research

In order to put this paper into context, we review the relevant research literature on pedestrian risk assessment, exposure models and generating synthetic population via iterative proportional fitting.

Current practice defines risk as the probability of a crash occurring given exposure to potential crash events. This definition is intuitive; however measuring exposure to potential crash events is difficult. We first survey the various approaches to risk, and then we discuss ways to measure and incorporate exposure into a pedestrian risk score.

An approach suggested by Raford and Ragland _(9)_ is to define pedestrian risk as the number of observed crashes in a given geographical area divided by the daily pedestrian volume. The authors make the case that the level of pedestrian risk can be defined as the annual number of pedestrian-involved crashes divided by exposure, which is represented by the annual estimated pedestrian volume _(9-12)_.

Given that pedestrian crashes occur infrequently, the aforementioned methods assign a risk of 0 to many areas. Traffic safety engineers have known for some time that evaluating risk solely by counting observed number of crashes simultaneously leads to an overestimation of risk in high risk areas and an underestimation in low risk areas. To address this issue, Hauer et al. _(13)_ proposed the Empirical Bayes (EB) method for the estimation of the level of risk that is capable of correcting for regression-to-the mean bias.

The EB method combines a model of predicted crash frequency and observed crash frequency to obtain a pedestrian risk score. The predicted number of crashes is determined by a parametric regression function called safety performance function (SPF). The SPF predicts the crash frequency for roads that are similar to the one under investigation. Traditionally, the SPF is developed using a negative binomial regression model to predict the number of crashes for a particular site based on known information, such as annual average daily traffic (AADT) and road geometry _(14-15)_. Unfortunately, SPFs for pedestrian-vehicle crashes do not include a measure of pedestrian volume. This paper contributes to the literature by incorporating a measure of pedestrian exposure into an SPF model.

Pedestrian exposure is defined as the measure of the number of potential opportunities for a pedestrian-involved crash to occur _(16)_. However, in contrast to vehicular behavior, pedestrian trips are of a different variety in terms of trip purposes and their route choices are less well defined _(17)_. Therefore, new methods that adequately reflect the context specific nature of pedestrian crashes are required for estimating the volume of pedestrian trips.

There are many studies regarding pedestrian exposure models using built environment, socioeconomic characteristics, demographic characteristics, and other factors to predict pedestrian volume _(18-19)_. Notably, Clifton et al. _(1,20)_ introduce an innovative model called the model of pedestrian demand (MoPED) that modifies the conventional four-step modelling (FSM) to better represent pedestrian walking behavior at a uniform 80-meter-by-80-meter raster grid cell, called pedestrian analysis zone (PAZ). The redrawn boundary at a more granular level enables the prediction of finer pedestrian behavior at a microscopic level than traffic analysis zone (TAZ). Mode choices for travelers are highly related to the built environment and socioeconomic factors _(21)_. To estimate the amount of walking trips generated by a household in each PAZ, MoPED uses a binary logit model based on socio-demographic characteristics of travelers and built environment to split walking trips from all person trips estimated by conventional travel forecasting model.

Clifton’s study further applies a multinomial logit destination choice model to distribute those walking trips to destinations within the aggregations of 25 (5x5) PAZs. It is known that distance to destinations plays a determinant role in destination choice models _(22)_. Additionally, attractiveness, pedestrian supports, pedestrian barriers and traveler characteristics also play key roles in the destination choice model. The destination choice model provides a linkage between built environment and pedestrian destination choices _(23)_.

Finally, the trip generation and destination models are combined to predict the probability of a walking trip traveling from one zone to another. The output of MoPED is a predicted measure of daily pedestrian volumes at a very fine geographic resolution (i.e. 80 meters by 80 meters). The key inputs to the method are socio-demographic variables, trip generation tables, detailed employment data, built environment data, and a travel survey.

Nevertheless, MoPED requires trip generation tables typically created by a region’s metropolitan transportation organization (MPO), which limits the statewide application of MoPED because trip generation tables are often not available in many places (i.e. small to medium sized cities without membership with an MPO). One of contributions of this paper is the modification of MoPED by estimating walking trip generation directly from a statewide travel survey without the need for a general trip generation tables. We generate walk trip generation tables by creating synthetic households using iterative proportional fitting.

The MoPED regression models for predicting walking trips requires disaggregate household and traveler demographics data as input. Since disaggregated data of household and traveler characteristics are typically not available at more granular geographic levels, a method for generating synthetic population data is needed. The Iterative Proportional Fitting (IPF) approach is applied to construct population synthesizer for the purpose of obtaining population estimates in a generic way _(24)_. The IPF process requires both aggregate data and disaggregate data as inputs. Specifically, the process starts by assigning initial values retrieved from disaggregate data, and then proceeds by iteratively updating the estimates based on the marginal totals of the same list of characteristics obtained from aggregate data. The disaggregate data represents a sample of households or individuals with values for a list of characteristics, and the most popular data source is the Public Use Microdata Sample (PUMS) _(25-26)_. The PUMS consists of a 5 percent representative sample of people and housing units from contiguous geographic units containing no fewer than 100,000 people each, named Public Use Micro Area (PUMA) _(27)_. As for aggregate data, it is normally drawn from Census summary table at different aggregate level (e.g., Census Block Group or Census Tract) based on the needs.

<a name="summary-of-state-of-the-art"></a>

## Summary of state-of-the-art

We conducted thorough review of the research literature to identify the evidence based of including factors into the risk score assessment. A detailed summary and categorization of these factors are available in the appendix.

<a name="methodology"></a>

# Methodology

This project uses a methodology that facilitates the identification of locations in Michigan that could benefit from ped/bike crash countermeasure installations. To accomplish this, we propose developing statistical models of both pedestrian and cycling crashes by combining a variety of data sources, which might include Federal fatal accident record systems (FARS), nationwide sample injury report data (GES), Michigan crash reports, hospital/emergency room records, activity centers, signalized intersections, road geometric data, land use characteristics, locations of deceleration and acceleration (highway ramps, curves, etc.), roadway volumes, population density, population demographics. The analyses will control for relevant factors such as roadway class, seasonality, travel direction and traffic complexity.

A unique component of the proposed methodology is the use of naturalist driving data to analyze near-miss crashes. These data provide insight into driver behavior and factors relevant to near crashes. UMTRI maintains a large database of naturalist driving data. UMTRI houses data from many naturalist driver field operational tests (FOT). These include ACAST, IVBSS and Safety Pilot. We will focus on data from the most recent FOT: Safety Pilot.

<img src="/markdown-img/image1.png" style="width:5.98889in;height:3.59861in" />

Figure 1. Methodology

The diagram overleaf provides a panoramic view of the study methodology. Our approach to modeling pedestrian demand closely follows the MoPED framework of Clifton et al. _(1)_. As noted earlier, we believe the number of crashes involving pedestrians does not solely determine the risk level for pedestrians, and pedestrian exposure should play an important role in influencing the risk level. Incorporating the measure of pedestrian exposure enables us to implement the EB method to estimate the risk level for pedestrians in Michigan.

<img src="/markdown-img/image2.png" style="width:6in;height:3.70069in" />

Figure 2 Traditional Four Step Method

<img src="/markdown-img/image3.png" style="width:6in;height:3.73194in" />

Figure 3 Modified Four Step Method

<a name="data-sources"></a>

## Data Sources

The key inputs to the framework are a statewide travel survey, the American Community Survey (ACS), the public use microdata sample (PUMS), roadway geometry data as well as statewide crash records.

The ACS is the model's main source of block-group level sociodemographic and household variables including household size, number of vehicles, and number of workers. The framework in Figure 1 requires disaggregate household characteristics in order to be applied statewide. We utilize the PUMS which contains the disaggregate responses of approximately 5% of households to the U.S. census.

Vehicle-pedestrian crashes are derived from Michigan police crash reports from 2005-2015 _(30)_. Throughout this study our geographic unit of analysis is the PAZ defined by a 400m x 400m grid.

<a name="michigan-traffic-crash-facts"></a>

### Michigan Traffic Crash Facts

https://www.michigantrafficcrashfacts.org/

<a name="american-community-survey-acs"></a>

### American Community Survey (ACS)

<a name="public-use-microdata-sample-pums"></a>

### Public Use Microdata Sample (PUMS)

<a name="mi-travel-counts-iii-mtc-iii"></a>

### MI Travel Counts III (MTC III)

MI Travel Counts III (MTC III) is a travel survey conducted in 2015 by the Michigan Department of Transportation ([MDOT](http://www.michigan.gov/mdot/0,1607,7-151-9615_51690---,00.html)). MTC III contains samples 16,276 households across the state reporting their weekday trips. Each surveyed trip includes mode, origin and destination, travel time, activities at each destination, and also household characteristics. We randomly selected 90% of the travel survey trips to estimate the model, and retained the other 10% for model validation.

<img src="/markdown-img/image4.png" style="width:5.50556in;height:2.39514in" />

Figure 4 MI Counts Traveler and Household Data

<a name="reference-usa"></a>

### Reference USA

We rely on [ReferenceUSA](www.referenceusa.com) for the location of businesses and employment data across the state _(28)_.

<a name="highway-performance-monitoring-system-hpms"></a>

### Highway Performance Monitoring System (HPMS)

The roadway geometry data are taken from the Highway Performance Monitoring System ([HPMS](https://www.fhwa.dot.gov/policyinformation/hpms.cfm)) _(29)_. These data include number of lanes, road width, and segment length.

<a name="exposure-model"></a>

## Exposure Model

<a name="unit-of-analysis"></a>

### Unit of Analysis

To facilitate the analysis, we take a 400 meters by 400 meters analysis zone as our basic analysis unit, which is called Pedestrian Analysis Zone (the original concept was brought out by Prof. Kelly Clifton, et.al.). The whole state is comprised of nearly 95,000 PAZs. The following graph compares the scale between PAZs with typical urban streets.

<img src="/markdown-img/image5.png" style="width:6in;height:3.34375in" />

Figure 5 Pedestrian Analysis Zone

Our model of pedestrian exposure borrows from the MoPED framework of Clifton et al. _(1)_ with a few notable exceptions introduced. First, we deviate from MoPED and the traditional 4 step method in that we do not estimate mode split. Instead, we generate walking trips directly from the statewide travel survey. Second, we extend MoPED so that it can be applied statewide by estimating disaggregate Block Group household characteristics via iterative proportional fitting. This allows us to generate walk trips statewide, even in areas that do not currently have an MPO that creates trip generation tables. Below, we summarize the key aspects of our modified MoPED framework along the following dimensions: pedestrian index of environment (PIE), trip generation, creating a synthetic population and pedestrian destination choice.

<a name="pedestrian-index-of-the-environment-pie"></a>

### Pedestrian Index of the Environment (PIE)

For measuring the impact of built environment on pedestrians’ choices, our model employed statewide travel survey data from MTC III and built environment data from various sources. Following Clifton et al._(23),_ we categorize the data into five groups as shown in Figure 2.

<img src="/markdown-img/image6.png" style="width:5.40694in;height:2.55694in" />

Figure 6 Pedestrian Index of the Environment (PIE)

Traveler characteristics contain socio-demographic information from MTC III. Attractiveness represents the value of destination. Clifton et al. _(1)_ used population size to quantify attractiveness with the population size defined as a combination of the number of households and the number of jobs per PAZ. Pedestrian supports are an index of built environment that encompasses seven dimensions shown in third column of Figure 2. Except for access to parks, the other six factors are grouped and called the Pedestrian Index of Environment (PIE). Access to parks was dropped from PIE because of its limited influence.

Factors in PIE are quantified on a scale of 0 to 5 for individual PAZ cell, in which a score of 0 means no access to certain infrastructure. A subtotaled score of weighted PIE factors helps to illustrate geography specific to the most granular spatial unit; otherwise, users can aggregate the PIE into larger spatial units, for example, census block or tract level. We used ArcGIS to quantify all the factors in pedestrian supports category. In addition, we used coefficients for each PIE factor from Clifton et al. _(23)_ given the data paucity on sidewalk and bike path that precludes running binomial logit regressions.

Barriers to pedestrian travel include the mean slope in the destination zone, the presence of freeways and the proportion of industrial-type employment. We processed data in ArcGIS via the spatial join tool, so that every PAZ contains a value about the precipitous nature, and information about whether freeway or industry appears.

As a measure of impedance, we directly used travel time in MTC III, which reflects time cost between the centroid of origin PAZ and destination PAZ along a network that included the complete street network and major off-street paths.

<a name="trip-production-model"></a>

### Trip Production Model

Conventional FSM uses multiple techniques including cross-classification or linear regression to estimate the total trip generation. However, the analysis unit of FSM, which is generally called traffic analysis zone (TAZ), is way too large for the measure of built environment for pedestrians. Also, when pedestrians make decisions about where they walk, it is understandable that distance should matter. Again, TAZ is unable to capture the variation of travellers’ walking distance since most of the walking trips would be intra TAZ trips rather than inter TAZ.

To overcome these limitations of TAZ in analyzing pedestrian behavior, we refer to the notion of PAZ proposed by Clifton et al. _(1)_ as mentioned above. By reassigning the origins and destinations to PAZ, we found that about 63 percent walking trips are from one PAZ to another, which improves from 38.5 percent for inter Census Block Group. With built environment measured for PAZ, we further model household and employee’s walking behavior for home-based and non-home based trips respectively. The exact walking behavior we model is the total number of walking trips produced from each PAZ, which is believed to be associated with household characteristics, built environment, and the number of employees.

Moreover, following the manner of FSM, trips are divided into five categories based on trip purposes _(31)_: home-based other (HBOther); home-based shopping (HBShopping); home-based school (HBSchool); non-home-based other (NHBO); and non-home-based work (NHBW). Regression analysis is performed on each of them. Furthermore, based on the nature of the data, we choose negative binomial regression and linear regression to fit the data for home-based trips and non-home based trips respectively. The regression can be represented by the following functions:

_Number of HB walking trips = f(number of households+household characteristics + built environment)_

and

_Number of NHB walking trips = f(number of employees +  built environment)._

Regarding, pedestrian destination choice, we assume that trips begin and end in the same PAZ. According to the MTC III survey, roughly 37 percent of the walk trips originate and terminate in the same PAZ. So, as a first order approximation, we make this assumption. The practitioner is free to implement a destination choice of her liking, such as the traditional gravity model or the hierarchical multinomial regression model of Clifton et al. _(32)_.

**Synthetic Population**

Pedestrian exposure measures the intensity of pedestrian activities in each analysis zone. However, to measure exposure, it is essential for us to know the population for each PAZ first (i.e., synthetic population). The synthetic population is comprised of households and individuals associated with list of characteristics -- e.g., household size, number of vehicles, gender or age _(33)_. In our case, due to the limited level of detail regarding individual characteristics recorded by the travel survey, we only chose household characteristics to generate the synthetic population.

Nevertheless, as noted earlier, such disaggregated data are not available at a small geographical scale like Census Block due to privacy concerns. To address this issue, our team generated the synthetic population for the state of Michigan at Census Block Group level based following the IPF process. Specifically, based on the household characteristic needed for subsequent analysis and data availability, we took four household characteristics into account, namely, household size, presence of children in the household, presence of workers in the household and the number of vehicles owned by the household. Also note that for simplicity, we do not differentiate family households from non-family households. A section of the synthetic population results for Census Block Group 261614032001 looks as follows:

Table 1 Sample synthetic population with GEOID 261614032001

|                  |                               |                    |                              |                                  |
| ---------------- | ----------------------------- | ------------------ | ---------------------------- | -------------------------------- |
| Number of Person | Presence of Children (binary) | Number of Vehicles | Presence of Workers (binary) | Count of this type of Households |
| 1                | 0                             | 0                  | 1                            | 11                               |
| 1                | 0                             | 1                  | 0                            | 13                               |
| 2                | 1                             | 1                  | 1                            | 5                                |
| 3 and more       | 1                             | 2 and more         | 1                            | 25                               |

<a name="destination-choice-model"></a>

### Destination Choice Model

<img src="/markdown-img/image7.png" alt="https://lh3.googleusercontent.com/arVKqucoznNowjt8KX9NGUEKz4MrN8pFecYmENbLDPSOjQuVZd7m1otAO9tFVG-niBMmDVuPepNfQ0sRirGvLDUv7bkN6CIcqIU0_STcwsEYy5CTBiLB84e0uMM8tp0lp-43I0eb" style="width:3.87222in;height:3.27917in" />

Figure 7 Destination model is based on sampling of real and possible destinations.

The destination choice model is based on logistic regression, and the regression is built upon household travel survey (i.e., MI Travel Counts). To prepare training data for the regression model, for every actual walking trips by trip type, we create a 1.5 mile buffer zone around the origin PAZ, and randomly sample nine PAZs as possible destinations (Fig.1). Hence for the travel records whose the destination is the actual one, the dependent variables are coded as 1 while those of the sampled records are coded 0.

To implement destination choice model, take a PAZ as an example, since we have estimated the walking trip production based on the walking trip production model before, it is where these walking trips end that interests us. To assign these trips to their destinations, we create a 1.5 miles buffer zone, which contains all possible destinations for this origin PAZ. For each pair of origin and destination PAZ (O-D), the destination choice model above helps us predict the probability that a pedestrian would walk between this O-D. After calculating the probability between all O-Ds, we normalize these probabilities to make them add up to 1. Finally, by multiplying the walking trips production by the normalized probabilities, we finish calculating the walking trips attracted to each possible destination PAZs.

<a name="route-choice"></a>

### Route choice

Apart from the walking trips production/attraction at PAZ level, it would be useful to know which route that pedestrian take. The following diagram illustrates how we calculate the pedestrian exposure at roadway segment level. To clarify, the destination PAZ below is one of all possible destinations within the 1.5 miles buffer zone of the origin PAZ. For convenience, we make them close to each other.

As we mentioned above, we multiply the walking trip production by normalized probability to estimate the walking trips attraction. Because some PAZs would produce more walking trips as some PAZs would attract more walking trips, certain streets would be expected to have larger pedestrian exposure than others. To capture this subtlety, we try to assign walking trips that happens between each O-D along roadway network. Since the number of walking trips between each O-D is known from last step, the network assignment is to find a route connecting each O-D. However, the O and D are not represented by the exact coordinates but an ID, thus we first try using the centroid of the PAZ as the origin and destination. Nevertheless, the results are not realistic because we observe many streets have not been traveled. To overcome this, as the following diagram suggests, we randomly choose one of the three nearest network node as origin and destination. With origin and destination represented by nodes on the roadway network, we presume each pedestrian would take the shortest route to reach their destination, and hence we utilize Dijkstra’s algorithm to find the shortest path (represented by the orange line). After performing the same procedure for each O-D, we end up getting the routes and their corresponding weights, i.e., the number of walking trips between the O-D.

<img src="/markdown-img/image8.png" alt="https://lh5.googleusercontent.com/yE1fENHoqsmfNi0rpqPb7zd0j2sMMnDXQu2Z2Pf4KhOkS5MOp2LDD0ld4U6vVHyxHGPreOayBofsOE8INRYLzBlQqiSrAMx7g3qsZkseysIvF8XcT1wgukxZ1jAeAtL7ZRdg05e_" style="width:5.93056in;height:3.80208in" />

Figure 8 Route choice

<a name="risk-score"></a>

## Risk Score

The basic idea of the pedestrian risk score is to make joint use of the observed number of pedestrian-vehicle crashes (historical data), and the predicted number of pedestrian-vehicle crashes for similar geographic areas. The pedestrian risk score for a PAZ is the expected number of crashes with higher risk scores been associated with geographical areas with higher expected number of crashes. The empirical Bayes estimate of the risk score for a PAZ is

<img src="/markdown-img/equation1.png" style="width:5.75417in;height:0.33333in" />

where <img src="/markdown-img/y.png"> is the number of observed crashed in the target PAZ ,<img src="/markdown-img/mu.png"> is the predicted number of crashes, overdispersion parameter &phi; and &omega; is

<img src="/markdown-img/equation2.png" style="width:5.75417in;height:0.33333in" />

is between 0 and 1.

We subsequently develop a SPF for the predicted number of pedestrian crashes. Our SPF includes not only the AADT, but also the pedestrian exposure and an interaction term between vehicle AADT and pedestrian exposure. The resulting negative binomial regression model specification is

<img src="/markdown-img/image13.png"/>

The regression coefficients a, c, b, d and the overdispersion parameter &phi; are calculated via maximum likelihood estimation. In the next couple of sections, we provide more details on the development of the exposure measure used in the SPF.

<a name="experimental-design"></a>

## Experimental design

<a name="equipment"></a>

## Equipment

<a name="procedures"></a>

## Procedures

<a name="findings"></a>

# Findings

In this section, we describe the risk score results, as well as the pedestrian exposure estimates for the state of Michigan. The application of the risk score framework and MoPED serves as a case study for practitioners. As a product of the case study, we also developed a GIS tool that allows users to interactively consume the results.

<a name="summary-of-data"></a>

## Summary of data

With the PAZ as the unit of analysis, we implemented MoPED for the 83 counties in Michigan. The results for Wayne county, which includes Detroit, are in Figure 3. Notice that the scale of pedestrian exposure ranges from 4 to 1600 pedestrian trips per day in a PAZ (400m x 400m). The risk model was run on the entire state which consists of 83 counties. A model for each of these counties was run separately to minimize memory requirements on our computer. Each county took approximately 45 minutes to run on a PC with an Intel Xeon CPU at 3.50 GHz and 32.0 GB RAM.

<a name="method-of-analysis"></a>

## Method of analysis

<a name="walk-trip-production"></a>

### Walk Trip Production

We used Michigan household travel survey (MTC III) to fit our trip production model. As mentioned in the walk trip production model, we divided trips into five categories, namely home-based other (HBOther), home-based shopping (HBShopping), home-based school (HBSchool) and non-home-based other (NHBO) and non-home-based work (NHBW) and run the regression separately. In Tables 2 and 3, we highlight the results for home based other (HBO) and non-home based other (NHBO) trips.

Table 3 Trip production estimates for home based other trips.

Table 4 Trip production estimates for non-home based other trips.

The results match our expectation for both home based trips and non-home based trips. The coefficients of PIE are always positive, which is reasonable because a larger PIE value stands for more pedestrian-friendly environment. For home based trips, the absence of vehicles is the most significant factors that make households choose to walk. However, owning more cars would make a household increasingly less likely to walk. Regarding non-home based trips the number of employees in a PAZ largely impacts the number of walking trips.

<a name="destination-choice"></a>

### Destination Choice

The table below summarizes the results of the destination choice model.

Table 5 Destination choice model results

<img src="/markdown-img/image16.png" alt="https://lh6.googleusercontent.com/8cbTtLxeoSoyxQvqyjXoywb6xoW2SqK2l554GJrzxCX7rBX6Xh6oa_pN3LQcB2XkchYgKlZ-eBuKOhL2HjhAS2ZSEoEW4MeNeqU9LCDLZXtKjBHnPuVkVkf0XXkPWwaqi0nTXc4A" style="width:5.74375in;height:2.95278in" />

In general, the model looks reasonable, distance, slope consistently have negative effect on making destination choice. Specifically, for a quarter mile (400 meters) increase in distance, the odds ratio in choosing a PAZ as destination varies from 0.461 to 0.628. In comparison, an increase of ten degree in the slope would lead to an odds ratio being as small as about 0.05, which is quite surprising. Moreover, an increase in PIE tends to increase the probability of choosing that PAZ as destination although its effect varies for different types trips. For example, for home-based work trips, a twenty-point increase in PIE would produce an odds ratio being 1.34. However, some values of the results could be counterintuitive. For example, proximity to park is not statistically significant for all trip purpose, and retail jobs would deter walking trips whose purpose is for school.

<a name="presentation-of-results"></a>

## Presentation of results

<a name="exposure"></a>

### Exposure

The resulting pedestrian exposure results are presented in Figure 3 for Wayne County. Exposure is measured as the number of daily walking trips that originate and terminate in a PAZ. Through the PIE index the exposure measure accounts for the population and job density, transit access, block size, and urban living infrastructure. The multi-way tables for household variables are created via IPF. The resulting household variables and PIE are the inputs to the trip generation model described in Section 4.1.

<img src="/markdown-img/image17.png" style="width:6in;height:4.64097in" />

Figure 9 Map of pedestrian exposure in Wayne County

<a name="risk-score-1"></a>

### Risk Score

The main step in generating the risk score is to estimate the safety performance function. This is accomplished by a negative binomial regression. The input variables to the SPF are: 1) log (AADT), 2) log of exposure, and an interaction term log(AADT)\*log(exposure). Another input to the risk score is the number of observed crashes. For this case study, we aggregate vehicle-pedestrian crash data from 2004-2015.

Once the SPF is estimated and the observed crash data are compiled, the risk scores are generated from the empirical bayes Equation (1). Figure 4 displays the risk score for Wayne County over the same extent as the exposure map. The risk score has the interpretation of the expected number of crashes in the next 11 years.

<img src="/markdown-img/image18.png" style="width:5.65069in;height:4.375in" />

Figure 10 Map of Pedestrian risk score in Wayne County

<a name="model-validation-10k-cross-validation"></a>

### Model Validation (10K cross validation)

<a name="discussion"></a>

# Discussion

<a name="validity-of-hypotheses"></a>

## Validity of hypotheses

<a name="factors-affecting-the-results"></a>

## Factors affecting the results

<a name="lack-of-side-walk-and-bike-lane-data"></a>

### Lack of side walk and bike lane data

<a name="lack-of-manual-count-data"></a>

### Lack of manual count data

<a name="limited-sample-size-of-the-travel-survey"></a>

### Limited sample size of the travel survey

<a name="definition-of-%E2%80%9Cexposure-to-risk%E2%80%9D"></a>

### Definition of “exposure to risk”

Our proposed risk score and corresponding safety performance function consider a PAZ to be increasingly risky with the product of vehicle AADT and pedestrian exposure. However, our current approach does not guarantee that pedestrians and vehicles are actually interacting. For example, pedestrian walking on a separated path near a road is not distinguished from pedestrians walking on a sidewalk. This may lead to spurious predictions of high risk areas.

<a name="implications"></a>

## Implications

The risk score results should be used with caution until they are properly validated and corroborated with manual observations. Until then, we recommend that the results be used in combination with existing accepted safety analysis procedures.

<a name="conclusions"></a>

# Conclusions

<a name="conclusions-from-the-study"></a>

## Conclusions from the study

This report shows that it is possible to conduct a pedestrian and bicycle safety analysis that goes far beyond observed crashes.

<a name="recommendations-for-further-research"></a>

## Recommendations for further research

We recommend a follow up study to validate the results of this report and the current implementation of the tool.

Further research is needed on the implementation of the tool into MDOT processes.

There is scope for research on an improved SPF for peds/bikes that go beyond AADT and exposure.

The exposure results are of independent interest and are relevant to crime and health outcomes.

<a name="implementation"></a>

### Implementation

<a name="validation"></a>

### Validation

<a name="improve-safety-performance-function"></a>

### Improve Safety performance function

Apart from the aforementioned, areas for further studies will include improving the risk score by systematically defining “reference groups” in the Empirical Bayes computation. The reference groups will be based on roadway as well as built environment and socio-demographics variables.

<a name="recommendations-for-implementation"></a>

## Recommendations for implementation

<a name="references"></a>

# References
