import React from 'react';
import TravelDay from '../components/TravelDiary/TravelDay';

export const days = [
  <TravelDay
      key={1}
      number={1}
      start={{ name: "Kathmandu", elevation: 1400 }}
      end={{ name: "Nagdi", elevation: 890 }}
      distance={183}
      stairFlights={{
          up: 0,
          down: 0
      }}
  >
      <section className="holly">
          <p>Today was an epic day of bus riding… It took us 9 hours to drive 183 km! The roads were crazy - narrow, windy, and bumpy, and the bus was hot. Really hot. I am pretty sure I sweat out every ounce of water that I drank. Along the way, we quickly realized part of the reason why there is garbage everywhere. People just throw it on the ground - right out the bus window. WTF?!</p>

          <p>Had a much-needed shower when we got to our tea house for the night - still working on my squat toilet technique. Cozied up under the mosquito net in our room now. Tomorrow we trek!</p> 
      </section>

      <section className="colter">
          <p>A bus ride from Kathmandu to Besisahar. About 170km. It was one of the tougher bus rides I’ve had. Incredibly warm, humid, and dusty. Lots of emissions. About an 8 hour drive. From Besisahar, we caught another, more offroad bus, to Ngadi. About an hour, but probably only about 10 km. Arrived, showered, and had dinner.</p> 

          <p>That was a lot of bus time today.</p>
      </section>
  </TravelDay>,
  <TravelDay
      key={2}
      number={2}
      start={{ name: "Ngadi", elevation: 890 }}
      end={{ name: "Chamche", elevation: 1385 }}
      distance={26}
      stairFlights={{
          up: 251,
          down: 155
      }}
  >
      <section className="holly">
          <p>After waiting out the rain this morning for an hour or so, we were on the trail about 8:30 am.</p> 

          <p>We are stopped for lunch now, with a waterfall view. It is very humid, but the scenery is so beautiful - so lush and green. So far, we have seen many rice and millet fields, hard-working women, baby goats, and a water buffalo cooling off in the river (with the help of his owner).</p> 

          <p>We are happy to be here - Colter just looked at me with a big smile and said “I love this!”</p>

          <p>After lunch, we walked for about 3 more hours - climbed a lot of stairs. I don’t know how our porter, Prem, does it. Definitely feeling guilty about any comfort items I packed…</p>

          <p>As we were walking through one of the villages, a group of about five little boys came running out, yelling “Namaste!”. They were laughing and smiling. A couple had a bag of candy, which they shared with us. So kind.</p>

          <p>Tonight we are staying at the Super Rainbow View Guest House (hot shower was a 10/10). We are nestled amongst the green hills, with an amazing view of the tallest waterfall we will see on our trek. Feeling the Nature Bath and loving it.</p>

          <p>Today was a success - lots of sweat, lots of stairs, lots of smiles, lots of sun.</p>
      </section>

      <section className="colter">
          <p>The first day of trekking. What a day. You couldn’t have paid that smile to leave my face. We walked for about 7 hours. 250 flights of steps and many kilometers. We drank probably about 3-4 L of water each. So many beautiful waterfalls, and a man bathing his water buffalo in the river.</p>

          <p>Great day. Need to stretch.</p> 
      </section>
  </TravelDay>,

  <TravelDay
      key={3}
      number={3}
      start={{ name: "Chamche", elevation: 1385 }}
      end={{ name: "Danaque", elevation: 2200 }}
      distance={24}
      stairFlights={{
          up: 265,
          down: 104
      }}
  >
      <section className="holly">
          <p>Felt kinda in a funk today - not too sure what is going on. We had a good day on the trail today - lots of uphill and a walk through the Marijuana Forest, it just grows wild here.</p> 

          <p>We were passed by a group of donkeys carrying rice up the hill. Noticing that fewer types of veggies are growing as we get higher.</p>

          <p>Can feel that the temperature is starting to drop a little tonight. I have to say that I am kind of looking forward to cooler weather. I always enjoy the transition from shorts to sweaters, sandals to slippers, sunhats to scarves.</p> 
      </section>

      <section className="colter">
          <p>Lots of uphill today. More trekking trails above the river. I love this.</p> 

          <p>I have been watching and trying to mimic the gait of our guide and porter. It seems to be improving my stamina, as I think it uses more of my entire leg. Lots of great viewpoints and took lots of pictures. Had to walk up a stretch of road that had a river running down it - a bit of water in the boots. Really proud of Holl. She is doing awesome.</p>

          <p>Got into our tea house and ate so much food. Very satisfied with how tired I am.</p>
      </section>
  </TravelDay>,

  <TravelDay
      key={4}
      number={4}
      start={{ name: "Danaque", elevation: 2200 }}
      end={{ name: "Chame", elevation: 2710 }}
      distance={17}
      stairFlights={{
          up: 167,
          down: 84
      }}
  >
      <section className="holly">
          <p>We had a shorter walking day today, only about 4 hours. The choice was 4 hours or 8...so we went with 4.</p>

          <p>While walking today, I tried to really take in the sites, smells, and sounds of the trail…
              <ul>
                  <li>The site of people harvesting their crops and drying them for winter</li>
                  <li>The sound of the bells of approaching animals (cows, goats, horses)</li>
                  <li>The sound of the flowing river</li>
                  <li>The honking of approaching Jeeps and motorbikes, followed by the lingering smells of their exhaust</li>
                  <li>The smell of woodburning stoves, for cooking and heating</li>
                  <li>The smell of farms (i.e. animal poop)</li>
                  <li>The site of homes meeting the most basic of needs</li>
                  <li>The site of the changing scenary as we climb higher and higher</li>
                  <li>The sound of Bibek (our guide) telling us about Nepalese culter and life in the villages</li>
              </ul>
          </p>

          <p>We seem to have started a few Trail Rituals... 
              <ul>
                  <li>Victory Skittles to celebrate the day of hiking</li>
                  <li>Dessert Peanut M&Ms</li>
                  <li>Team foot massages</li>
              </ul>
          </p> 
      </section>

      <section className="colter">
          Shorter day today. Decided against another 8 hour day, as there will be ample opportunity in the coming days. Started with a good climb to Timang. Then meandered along the road through Koto and finally to Chame. 

          Learned that Canada’s highest mountain is only a peak in Nepal. Canada only has 1 peak. The rest of the “mountains” are only considered hills, by Nepalese standards. Continue to be proud of my Holly. Her fitness is doing great.
      </section>
  </TravelDay>, 

  <TravelDay
      key={5}
      number={5}
      start={{ name: "Chame", elevation: 2710 }}
      end={{ name: "Upper Pisang", elevation: 3310 }}
      distance={21}
      stairFlights={{
          up: 191,
          down: 68
      }}
  >
      <section className="holly">
          <p>Today was a great day. We had only about 5 hours of walking today, but as we are gaining elevation, we will have shorter days. Started to feel the elevation today, especially on steeper climbs - hard to catch your breath.</p>

          <p>This afternoon, when we reached the tea house, we were able to get a glimpse of Annapurna II - wow the mountains are magnificent. Hoping we can see it again tomorrow morning if the clouds have moved on...</p> 

          <p>While you are walking, it is hard to grasp the elevation, as you are constantly surrounded by hills, peaks, and mountains that are higher that you. It is quite a feeling walking through nature on such a grand scale! One moment really stuck out for us today. We were walking on a narrow trail among the trees - mostly pines. There were pine needles all over the ground. The forest floor was slightly damp and there were roots sticking up. The visual, combined with the smell, transported us back home. For a moment, it was like we were hiking at home. It is nice to have these small connections to home, as we begin to miss it more and more.</p> 
      </section>

      <section className="colter">
          <p>Today was a great day. We started out mostly on the road but eventually transitioned into some uphill trekking trails. As we gain elevation, the trees are starting to change, from lush ferns to pine trees. The last 3 hours of our trek today was spent in the forest that reminded me of home. It made me realize how homesick I am feeling.</p> 

          <p>Today we started to see Annapurna II, at a height of ~7,900 m. It is amazing. Our guide will point out some clouds and say, “There is a mountain back there.” It’s hard to believe. All of the surronding “hills” are already so tall, but the wind blows and the clouds part briefly to reveal them. Like chaperones quietly watching from a distance, these mountains reach to the sky further than I imagined. Incredible.</p>
      </section>
  </TravelDay>,

  <TravelDay
      key={6}
      number={6}
      start={{ name: "Upper Pisang", elevation: 3310 }}
      end={{ name: "Ngawal", elevation: 3680 }}
      distance={15}
      stairFlights={{
          up: 145,
          down: 70
      }}
  >
      <section className="holly">
          <p>Today we had probably our hardest and longest climb yet, from Upper Pisang to a village called Ghyaru. It was about 45 minutes climbing up a windy road. If felt great to get to the top, where a lot of other trekkers were also resting. We had a beautiful view of Annapurna II - Colt got some amazing shots!</p>

          <p>After our rest, we made our way to our stop for the night - Ngawal. Not much climbing, but what we are learning to call Nepali Flat: “a little bit up and a little bit down”. We had a nice little afternoon nap when we arrived at the tea house in Ngawal. Not so lovely is the fact that my sunburn from Day One, has morphed into a heat rash, which is now peeling. Not pretty. Hoping it heals quickly and I don’t have to deal with it in my bridesmaid’s dress at Ash and Mike’s wedding…</p>

          <p>Had a great chat with my dad this morning. So looking forward to seeing my family.</p>
      </section>

      <section className="colter">
          <p>Today was another lovely day. It started with a flatter walk through forest that reminded me of Rose Hill or Lilouette. For the first part of our walk the path was lined with happy, organic pot plants coming into bud.</p> 

          <p>The “home forest” was followed by a long 45 minute climb to Ghyru. We continued skirting across the hills; the sun is hot. Holly’s burns are not good but will hopefully improve.</p>
      </section>
  </TravelDay>, 

  <TravelDay
  key={7}
      number={7}
      start={{ name: "Ngawal", elevation: 3680 }}
      end={{ name: "Khangsar", elevation: 3750 }}
      distance={21}
      stairFlights={{
          up: 122,
          down: 127
  }}
  >
      <section className="holly">
          <p>Well, today was a grind for me - physically and mentally. I think yesterday I had gotten a little too much sun, so I went to bed early and drank plenty of water. I felt a little better this morning. We had breakfast (I switched from my regular oatmeal to Tibetian Bread and eggs, which may have been a mistake).</p>

          <p>Not long into our walk, I started to feel kind of nauseous and had an upset stomach - it seems the greasy breakfast I had wasn’t agreeing with me. That, coupled with the the intense sun, left me feeling on the verge of puking/passing out. Luckily we fashioned some make-shift sunhats out of our buffs and ball caps, which I think was a lifesaver today.</p>

          <p>We continued to make our way slowly along, up some pretty steep climbs. With Colter’s encouragement (he’s the best, I love him the most), I continued to will one foot in front of the other and made it to our hotel for the night. And I didn’t puke - bonus! Bonus number two… this place has a flushing toilet!</p>

          <p>Feeling better now, and hoping that tomorrow isn’t as much of a struggle. Though it seems that each day will be a struggle in its own way. But I suppose this is how we grow - pushing ourselves beyond the limits we place on ourselves to become more complete versions of ourselves.</p>
      </section>

      <section className="colter">
          <p>Today was a surprisingly difficult day. It started with some easy walking on the road out of Ngawal toward Manag. The sun is overpowering at these altitudes. Much of the day we walked through terrain that reminded me of Kamloops. The wind was cool but misled our bodies as to how hot the sun was. Holly had a different breakfast this morning and was feeling nauseous all day. But I stayed with her and gave her words of encouragement, and we finally finished the climb into Khangsar.</p> 

          <p>Today was a difficult day on the mind. I had let myself think that it might be an easy day, but it was not. But I tried my best to stay strong for Holl. Really proud of how she did today.</p> 
      </section>
  </TravelDay>, 

  <TravelDay
  key={8}
      number={8}
      start={{ name: "Khangsar", elevation: 3750 }}
      end={{ name: "Tilicho Base", elevation: 4150 }}
      distance={35}
      stairFlights={{
          up: 350,
          down: 332
  }}
  >
      <section className="holly">
          <p>Okay, well, if I thought yesterday was hard, it had nothing on today! Our walk from Khangsar to Tilicho Base Camp wasn’t too bad. It was beautiful actually. I don’t know that I have ever felt that dwarfed by natured. We were walking between two huge stone walls. It almost felt like we were in a canyon. Then at points, we were walking a narrow trail that had loose gravel and rocks on the slant above and below you. It was a little nerve-racking for sure - thinking that one missed step might have you rolling down the hill toward the river below. But just when I thought our walk was hard, we saw some men carrying the equivalent of about 15, 12 foot 2x4s on their backs, walking along the same trail as us. Most of the way, the trail was too narrow to walk straight forward, so they were walking on an angle to keep the boards from hitting the slopes next to them - it was crazy!</p>

          <p>We arrived at Tilicho Base Camp just in time for lunch. We had a little rest and some food and geared up to hike to Tilicho Lake. The world’s highest lake, at 4,900 meters…</p>

          <p>I think the climb may have trumped the Whistler Gran Fondo as the hardest physical thing I have ever done. I could not have done it without Colt. I could not ask for a better teammate - he was my champion today...and every day!</p>

          <p>The change in elevation paired with the physical exurtion made it hard to breathe and brought with it headaches and light-headedness. At one point, I was sure I wouldn’t be able to make it. I had myself worked up and in tears. Soon Colter was behind me cheering me on - keeping my focus on the next rock, the next bolder, the next patch of moss. It was as much a physical (legs burning, heart-pumping) challenge, as it was a mental (willing one foot in front of the other) challenge. But eventually, after 3 hours of climbing, we made it! It was a surprisingly emotional moment for both of us. We were both fighting back tears.</p> 

          <p>Soon we could see the glacier and the lake. I am still not sure if it was worth the pain, haha, but it was pretty amazing. The lake was a beautiful blue and the glaciers in the background were breathtaking. We enjoyed the view and took a few pictures, but it wasn’t long before we had to move. It was cold up there!</p>

          <p>The walk down wasn’t as hard as the walk up, but it was still challenging, fighting the jello legs, sliding rocks, and light-headedness. Needless to say, we were happy to make it back to base camp. Now we are trying to warm up with some hot garlic soup - looking forward to bed!</p>

          <p>Sidenote: Prem and Bibek are downhill walking machines. They were insanely fast… oh, and Prem wasn’t even tired when we got back!</p>
      </section>

      <section className="colter">
          <p>Well, I had thought about so many things to write about during this day. By far the hardest day we have had. The trek from Khangsar to Tilicho Base Camp went pretty well. We walked through some dicey trails, across some amazing hills and rock formations.</p>

          <p>After we got to base camp, we ate lunch - Dal Bhat, as per usual for me these days. After lunch, we headed out to see Lake Tilicho. 3 hours of climbing. 700+ meters of elevation. It was a grind, to say the least. I’ve done some difficult things, but that struck on many chords. On the one hand, it was grueling. Literally, uphill for 3 hours, with the worst of the uphill at the end in a series of switchbacks that only on our decent I realized how far they stretched down the hill. On the other hand, it was emotional. Holly became quite overwhelmed at one point, near the start of the switchbacks. She was almost in tears and was hyperventaling. I slowed her breathing down and told her I was here with her the whole way. The rest of the way up the hills I kept pointing out small objects in front of us to shoot for. And at each corner, I would say, “And that’s another corner done Holl.” When we got to the top, I found myself light-headed and stumbling and on the verge of tears. So proud of my girl. What a day.</p>
      </section>
  </TravelDay>, 

  <TravelDay
  key={9}
      number={9}
      start={{ name: "Tilicho Base", elevation: 4150 }}
      end={{ name: "Yak Kharka", elevation: 4050 }}
      distance={27}
      stairFlights={{
          up: 187,
          down: 246
      }}
  >
      <section className="holly">
          <p>Halfway!</p> 

          <p>Today was a pretty nice day of walking. A few climbs and some steep downhills, but we were lucky to have some nice flat stretches as well. We are trying to work on our downhill strategy to keep up to Prem and Bibek - so far, really quick tiny steps seem to be the winner.</p> 

          <p>Layered up now, playing cards, and hiding from the rain. Tomorrow we make our way to High Camp…</p> 

          <p>Today we learned: 
              <ul>
              <li>Trekking = walking to a new place each day</li>
              <li>Hiking = leaving from and returning to the same place</li>
              </ul>
          </p>
      </section>

      <section className="colter">
          <p>Today was a good day. We set out around 8 am and made good time to the trail to Yak Kharka. The trail led up the hill overlooking Khangsar, around the hill, and down the other side to the river. We crossed the river, after descending some steep terrain, and had lunch on the other side of the bridge. Bibek told us all about the cast system and some of the religions in Nepal. The cast system sounds crazy: 4 main categories with 106 casts distributed among them. Lunch was so good. Delicious veggies: cabbage, carrots, and potatoes. After lunch, we continued on. It started raining. An hour up the road we reached Yak Kharka, which loosely translates to Yak Pasture.</p>
      </section>
  </TravelDay>, 

  <TravelDay
  key={10}
      number={10}
      start={{ name: "Yak Kharka", elevation: 4050 }}
      end={{ name: "High Camp", elevation: 4850 }}
      distance={16}
      stairFlights={{
          up: 207,
          down: 28
      }}
  >
      <section className="holly">
          <p>Well, we made it to high camp today, but not without some excitement…
              <ol>
                  <li>We saw a herd of yaks - big ones, little ones, fighting ones, eating ones, pooping ones.</li>
                  <li>We saw mountain goats up on the hill in the landslide area. At one point, the goats kicked down some rocks. All I heard was Colter yell, “Holly!” I looked up and saw a good-sized rock falling down. Ahead of me I saw Prem and he started to run, so I followed suit. Luckily, we got out of the way in time - Phew!</li>
              </ol>
          </p>

          <p>Post-lunch, we made the hour climb to High Camp. It was definitely a challenging climb, but nothing like the hike to Tilicho - we were prepared.</p> 

          <p>Last big climb tomorrow...I think</p>
      </section>

      <section className="colter">
          <p>Today was another great day. Easier than the previous days, but with a challenging end. We made it from Yak Kharka to Thorong Base Camp and had lunch. After lunch, it was straight up the hillside to Thorong High Camp, where we spent the night.</p> 

          <p>Some notable moments from today… We got to see/walk by a herd of yaks. Also saw some mountain goats above us on our way to Thorong Phedi, at which point, Holly was almost hit with a small bolder. It was a scary moment. After we got to High Camp, we met some trekkers from Belgium and their guide. We played a great card game called Shithead with them in the dining room, where they had lit a fire. It was a great time. Their guide had a heart/oxygen measuring device, and my oxygen level was at 87%, which he said was awesome.</p> 

          <p>The rooms had two single beds with some pretty ancient old blankets and a very solid draft coming in from all windows and doors. In order to counteract the elevation sickness, we are drinking lots of water and eating garlic soup.</p> 
      </section>
  </TravelDay>, 

  <TravelDay
  key={11}
      number={11}
      start={{ name: "High Camp", elevation: 4850 }}
      end={{ name: "Muktinath", elevation: 3800 }}
      distance={23}
      stairFlights={{
          up: 129,
          down: 499
      }}
  >
      <section className="holly">
          <p>Pass Day!</p>

          <p>Last night we enjoyed our evening at High Camp. It was full of people - I can’t imagine what high season would be like. We connected with a couple from Belgium and their guide. They taught us a great new card game, called Shithead. We spent the evening playing cards and chatting, while we attempted to extract as much heat from the fire as possible, wrapped in our sleeping bags. Around 8:00 pm we heading for bed, with little success. It was cold and sleep at such high altitudes does not come easily. We had a night of poor and intermittent sleep, but we were up (along with the little mouse in our room) and on the trail for 5:30 am…</p>

          <p>We had such a beautiful morning for the pass. There was no wind and the rising sun was shining on the snow-capped peaks. It was stunning. As we were climbing, surrounded by the bare brown-grey landscape contrasting against the blue sky, with beautiful views of the peaks, I felt like I was in an episode of Planet Earth. It was like nothing I had ever experienced. It was so still, quiet, calm, and peaceful.</p>

          <p>After a 2 hour and 15 minute climb, gaining 566 meters of elevation we made it to Thorung La Pass - 5,416 meters! Victory - high fives all around! It felt like such an accomplishment to come around the corner and see the sign and all the prayer flags. We searched out our extra layers and bundled up, so we could take it all in. Amazing. Eventually, we started our descent down the other side. It was steep. It was long. It was hard. Arguably, harder than going up.</p> 

          <p>So happy I got to do this with Colter! It is a day we will never forget.</p>
      </section>

      <section className="colter">
          <p>Given the amount of water we drank, I got up 2-3 times in the night to make the 50 foot walk in the misting rain to go to the bathroom. Sufficed to say, I got about 2-3 hours of restless sleep. 4 am came quickly and I woke up with nausea and a headache from the elevation. I packed up things while trying to wake Holly up. I went out and filtered 2.5 L of water and proceeded to try and drink my headache away. Nausea, unfortunately, hampered my breakfast eating, so I only choked down about half of my breakfast. Our guide suggested that we leave so that I could get some fresh air. So we left and began our climb through the pass.</p>

          <p>The morning was brisk, but quickly the sun began to rise above the mountains. The views were stunning. I didn’t find the climb too hard but stuck with Holl to support her up the pass. We made it up to the top in about 2 hours and 15 minutes. Ahead of the 3 hour estimate. The descent from the pass was long and steep. From the top 5,416 m down to Muktinath was about 1,600 m. Much of which was steep switchbacks. My headache got worse as we descended. At this point, my body needed to eat. By the time we stopped, I was too nauseous to eat. I managed some garlic soup and a few bites of rice, enough to get us to Muktinath. We stopped at a temple along the way, which is a famous destination for Hindus and Buddhists. It had 108 water taps, which people run through to purify their sins.</p>
      </section>
  </TravelDay>,

  <TravelDay
  key={12}
      number={12}
      start={{ name: "Muktinath", elevation: 3800 }}
      end={{ name: "Marpha", elevation: 2670 }}
      distance={25}
      stairFlights={{
          up: 81,
          down: 273
      }}
  >
      <section className="holly">
          <p>Had a pretty easy day of walking today - nice for a change, a little break from the steep up and steep down. And as an added bonus, we met up with a couple from Australia, Jenny and Mark, who we had seen at a few of the tea houses in the days before. It was so nice walking and chatting with them. They have done so many treks and travels together; it was great to hear their stories.</p>

          <p>We battled the wind today. It was at our face the whole way from Jomsom. The rain seemed to be threatening, but luckily it didn’t come. We checked out the monastery in Marpha this afternoon. There were fabulous views of the village from the top. It is quite a beautiful little village.</p>

          <p>Waiting for some French fries now - looking forward to another good sleep tonight.</p> 
      </section>

      <section className="colter">
          <p>We left Muktinath early in the morning. We ran into an Australian couple whom I had met at the Pisang temple. We ended up visiting with them while we walked and ended up having lunch together. Our guides and porters were also having fun chatting, while they walked ahead of us.</p>

          <p>The headwind was relentless as we walked along the road. We saw a plane landing in Jomsom, as we were arriving. It banked over the hill on one side of the valley and straighted out just in time to miss the other side. We made it to Marpha, which is a beautiful little village with an extraordinary pattern of rooftops and pathways. We went up to the monastery to get a view and also saw some monks teaching younger kids with prayers and songs. After the monastery, we had a nice dinner with Mark and Jenny. Holl and I tried the apple and apricot brandy, which were in glasses much larger than 100 rupees should have bought!</p>
      </section>
  </TravelDay>,

  <TravelDay
  key={13}
      number={13}
      start={{ name: "Marpha", elevation: 2670 }}
      end={{ name: "Tatopani", elevation: 1200 }}
      distance={38}
      stairFlights={{
          up: 0,
          down: 0
      }}
  >
      <section className="holly">
          <p>Wow! What a travel day today. We decided to take a Jeep, with Mark and Jen, from Marpha to Tatopani, instead of the two-day trek along the road. I am still not sure what would have been worse, the walk or the drive… I am leaning toward the walk, but it’s hard to stay. I have never seen a road like that.</p> 

          <p>Our day looked a little like this: 
              <ul>
                  <li><b>7:45 am: </b>With our gear strapped to the top, we all piled into the Jeep and head out into the unknown.</li>
                  <li><b>9:15 am: </b>We were stopped by road construction/repair. Weren’t entirely sure what was going on, but it soon became clear that at least 5 excavators were repairing the road.</li>
                  <li><b>11:45 am: </b>Finally we were on the road again, well if you can call it a road… We drove through rivers and mud and over boulders. Looking out the window, holding onto the Oh Shit handle with all my strength, I couldn’t help but strategize about what I might do if we ended up over the edge in the raging river below.</li>
                  <li><b>3:00 pm: </b> Arrived in Tatopani! Not a moment too soon. Food and relief! Time to rest and relax and prep tomorrow’s climb.</li>
              </ul>
          </p>
      </section>

      <section className="colter">
              <p>Today we went on the craziest Jeep ride I have ever been apart of. Through and down rivers, traversing cliff sides in rain, and feeling that at any moment the road might slide out into the raging river hundreds of feet below. We came to a section of road that had been damaged by a landslide and had to wait 2.5 hours for the 5 excavators to repair the road. Once we started to move again, the road quickly began to degrade. The rocky road turned into a sloppy mud pit. The local busses would toot their obnoxious horns and pass us on the shoulder, as they plowed through puddles and mud pits. It was a wild ride and we were so relieved to arrive in Tatopani alive.</p>
      </section>
  </TravelDay>,

  <TravelDay
  key={14}
      number={14}
      start={{ name: "Tatopani", elevation: 1200 }}
      end={{ name: "Ghorepani", elevation: 2870 }}
      distance={26}
      stairFlights={{
          up: 417,
          down: 62
      }}
  >
      <section className="holly">
          <p>Today was our longest and biggest climbing day yet. We gained 1,670 m over 26 km and 7.5 hours. Luckily it wasn’t too steep and we were on trekking trails most of the way - man did we climb a lot of stone steps.</p> 

          <p>Up until lunch, the weather was humid, but not too hot. Perfect weather for walking. We stopped for lunch about 4 hours in. There was the cutest little toddler at the restaurant. He was playing with Colter, and Jen and Mark gave him a little smiley face ball - seeing the children here so happy with so little really puts things into perspective.</p> 

          <p>While we were eating, the rain started… and it hasn’t stopped. Our last 3.5 hours of walking was in the rain. We were all very happy to get to our hotel, where we were very excited to get a room with not only a hot, glorious shower, but also the chimney pipe from the dining-room fire downstairs - so great for drying all our stuff! After our hot shower, we curled up in our sleeping bags, watched a little Harry Potter, and enjoyed a full Snickers each. It has been so long since I have eaten a whole chocolate bar. It was fabulous #findingjoy.</p> 

          <p>Heading down to the dining room now for dinner, cards, and planning the last bit of our trek.</p>
      </section>

      <section className="colter">
          <p>We set out early this morning with our trekking friends, Mark and Jenny. 20 minutes of road and then we began uphill. We reached Sikha about 4 hours in, after some steady climbing and great visits. We told Jenny and Mark about our wedding and realized that Jenny and I have the same birthday!</p> 

          <p>Lunch was excellent. We were all enamored with a small child in the restaurant. During lunch, it began to rain and proceeded to rain for the rest of our 3-4 hour uphill trek to Ghorepani. We got to the hotel and our room had a chimney for the wood stove on the main floor, so our room was a little more toasty than others. We then had the hottest shower we have had all trek. It was glorious. We went downstairs and played cards with Mark and Jenny. They are leaving tomorrow for Hile. We left them our final notebook from the Notebook Project. They were pretty excited about it. So were we.</p> 
      </section>
  </TravelDay>,

  <TravelDay
  key={15}
      number={15}
      start={{ name: "Ghorepani", elevation: 2870 }}
      end={{ name: "Mohare Danda", elevation: 3313 }}
      distance={12}
      stairFlights={{
          up: 142,
          down: 67
      }}
  >
      <section className="holly">
          <p>Last night, chatting with Bibek we decided to check out a different place today - one that only Prem had been to. It has been rainy and quite clouded in for the last couple of days, so we were hoping this alternate route would give us a better view of the mountains.</p>

          <p>This morning we parted ways with Jenny and Mark. Before leaving we traded info, so hopefully, we can go to Australia and visit them one day. At around 7:30 am we headed to Poon Hill. It is supposed to offer stunning views of the mountains… if it is clear. It wasn’t. So we didn’t see much. From Poon Hill, we started the unknown trek to Mohare. The trail was quite beautiful amongst the trees. It was also very quiet - you could tell that it is not yet a very popular route. Not long into the walk, we realized that the recent rain had surfaced all the leeches. Every 10 minutes we had to stop to get the leeches off our boots in hopes of preventing them from getting inside - so gross. I lucked out and didn’t get any and Colter only got one on his hand. Prem wasn’t so lucky in his flip-flops… We made it to Mohare in about 2.5 hours and not a moment too soon. My leech-fighting patience was starting to wear thin haha.</p> 

          <p>Looking forward to cozying up to the fire in the dining hall this evening.</p> 
      </section>

      <section className="colter">
          <p>An early day today. We headed out into the rain and up Poon Hill. Because the weather has been so awful, many people have diverted their treks to this area, so Ghorepani was very busy. Bibek had suggested that we go a new route to a place beyond Poon Hill called Mohare Danda. He told us that he hadn’t been there before, but Prem had and that it would give us a longer window of time to view the mountains. It was steady rain up to Poon Hill, where everything was socked in. We took in what we could of the view and then set off into the forest on a loosely trodden trail, quickly finding ourselves trekking through leech country. The hike itself probably would have taken 2 hours, but we were constantly stopping and removing the small, worm-like leeches from our boots before they hiked up into our socks and boots.</p> 

          <p>We finally arrived at our destination, Mohare Danda, a remote community-funded lodge that was more established than I anticipated. No showers, but free wifi and a whole bunch of solar panels. The rooms were simple and tucked away from the dining hall. The dining hall was perched on the top of a hill and offered an awesome lookout spot for some panoramic views. Unfortunately, the clouds were still engulphing the mountains around us. But I stayed optimistic and told Bibek that it would clear and the next day there wouldn’t be a cloud in the sky. He laughed and said he “could not garantee”, but believing my mother’s mantra of “creating your own reality”, I continued to believe. Sure enough, before dinner, the clouds began to part as the setting sun descending upon the peaks. The pink and orange cast upon the peaks was inspiring. I found myself running around the top of the mountain from the setting sun to the lake of clouds and sun stretching its rays across the hills and back to the orange and pink peaks. It was a magical evening… now we just have to get up early and see if it’s clear…</p> 
      </section>
  </TravelDay>,

  <TravelDay
  key={16}
      number={16}
      start={{ name: "Mohare Danda", elevation: 3313 }}
      end={{ name: "Ramghai", elevation: 1200 }}
      distance={25}
      stairFlights={{
          up: 57,
          down: 548
      }}
  >
      <section className="holly">
          <p>Today was a beautiful day, for so many reasons…</p>

          <p>Colter woke me up early (5:30 am) for a beautiful sunrise and spectacularly clear skies, giving way to a mountain view like I have never seen. Shout out to all of those loved ones up in heaven clearing the skies for us today! This is sure to be one of the stanout moments of our trip. Seeing two of the top ten highest mountains in the world, with no one else around. How do you beat that?</p>

          <p>Relunctantly, we left the views at about 9:00 and started the journey down...we traversed a lot of downhill today (~2000 m) with such varied landscapes: high altitude mountain views, jungle with barely walked trails, mud, and giant tree-like rhododendrons, rolling hills with wildflowers and a mountain backdrop (Sound of Music Style), rivers, bridges, and a scary momma water buffalo.</p>

          <p>At last, we got to our stop for the night. We had a lovely hot shower and relaxed for a bit. As I write this, Colt is playing soccer in front of our hotel with a handful of local kids. It is so fun to listen to and watch them play. Finding joy!</p>

          <p>Today marks the 10 day count down until we fly home! Very much looking forward to it, but at the same time can't belive that it is that close already.</p>

          <p>I can’t believe that tomorrow will be our last day of trekking!</p>  
      </section>

      <section className="colter">
          <p>Sunrise was at 5:51 this morning, so naturally, I was up at 4:50 am. I gathered the camera and tripod and made the small, 20 m, jaunt to the top of the hill, by the dining hall. I could see the gradient stretching up from the East. Beginning with a deep orange to a white pale blue. The mountains were bare of clouds and stoically standing amongst the stars… I felt like this was a photography moment I had been waiting for all trip. So I did my best, but I definitely overexposed some shots… darn. I took some pictures, but then I realized that Holly had to see this.</p>

          <p>I ran down the stone steps, like a kid on Christmas morning. I put my phone next to her and set an alarm fro 5:15 am so that after she inevitably snoozed it, she would walk up prior to the sunrise. I soon saw her climbing up the stairs wearing all her clothes and her sleeping bag. Quickly, her eyes widened at the majestic site. We took many pictures this morning, as Bibek said we could leave a little later so that we could enjoy the views. There was not a cloud in the sky for hours.</p> 

          <p>We had breakfast and then set out on our long descent into the valley below. We descended over 2000 meters over the course of 7 hours. By the end, my legs felt like soggy logs, barely maintaining balance under the shifting weight of me and my pack full of camera gear and water.</p> 

          <p>We arrived at the guest house around 4:00 pm and had a shower. Holly and I did a team foot massage and then headed toward the dining hall. Four boys were playing soccer in the courtyard and despite my soggy log legs, I couldn’t resist playing with them. We played for about an hour before I retired, sweaty and tired, for dinner. We went to bed straight after dinner. We were both exhausted.</p>   
      </section>
  </TravelDay>,

  <TravelDay
  key={17}
      number={17}
      start={{ name: "Ramghai", elevation: 1200 }}
      end={{ name: "Pokhara", elevation: 1400 }}
      distance={50}
      stairFlights={{
          up: 60,
          down: 74
      }}
  >
      <section className="holly">
          <p>Today was the last day of our trek - we did it!</p> 

          <p>Our last day of walking was short, only a couple of hours to Nayapul. From there, we took about a two hour taxi ride to Pokhara. It was probably the nicest ride we have had on the trek - a little bumpy and one slow down, but there were actually some nice paved and smooth areas. As we were coming into Pokhara, we stopped at a viewpoint where you could see the lake and all the paragliders. We were expecting the lake to be a bit bluer, but instead, it was a muddy brown color - maybe all the rain? When we got to our hotel, we took some time to have a wonderful hot shower - I even got to shave my legs! Then we headed down for our last lunch with Prem and Bibek, of course, we had to have Dal Bhat.</p> 

          <p>We felt sad to leave Prem after lunch. We had moments of connection and laughs with him, but it was hard to truly express the difference he made for us. He was an absolute machine! I hope I always remember the sound of his flip flops clip-clopping as he caught up to us after one of his short breaks. I hope his transition to Malaysia goes smoothly.</p> 

          <p>We spent the rest of the afternoon sightseeing with Bibek. I have to admit I was pretty tired and not totally in the mood for groups of people, after having so many days in the mountains, but we saw some interesting stuff. After our tour, Bibek dropped us off at the hotel and made his way to the night bus back to Kathmandu.</p> 

          <p>It was nice to go for dinner just the two of us. We had a great meal down the street from our hotel. We spent the rest of the evening catching up with our moms, and wrapped up with a Snickers and Harry Potter and the Goblet of Fire. This Harry Potter-Snickers combo is becoming a bit of a habit…</p>

          <p>Looking forward to starting the yoga and meditation retreat tomorrow.</p>
      </section>

      <section className="colter">
          <p>Our last day of trekking today. What a ride. It feels like just yesterday we were at the top of the pass. Today was a leisurely 2.5 hours to Nayapul. We caught a taxi into Pokhara, which was, as usual, longer than expected due to traffic issues (a truck and bus getting stuck together trying to pass each other). We arrived at our hotel, had a hot shower, and went for Dal Bhat at a local restaurant. After lunch, we said goodbye to Prem, which was surprisingly emotional. I will miss him and his speedy ways. Then we set out to see the sights of Pokhara with Bibek; he adjusted our itinerary so that tomorrow we check into a yoga retreat for 3 nights, then off to Chitwan, before heading back to Kathmandu.</p>

          <p>The cab driver first took us up to see the yoga center, which was great because it was in the middle of the hills - now we know where to go tomorrow. Then we doubled back across town to see the mountain museum, Devi’s Falls, and some caves, before going up the hill to the large Stupa. It was supposed to be a silent place, but most of the tourists were very loud. It was frustrating.</p> 

          <p>We bid farewell to Bibek and headed out for a delicious dinner, after which, a large lightning storm started. The rain was relentless. We sat in the dark, watched Harry Potter, and ate snacks.</p>
      </section>
  </TravelDay>
]