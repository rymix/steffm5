import {
  StyledAbout,
  StyledImage,
} from "@/components/ContentPages/About/styles";

export const About: React.FC = () => {
  return (
    <StyledAbout>
      <h2>A Passion Project of Digital Preservation and Archaeology</h2>
      <h4>First posted: June 26 2021</h4>
      <p>
        I've been working on a new project in my evenings. Stef.FM. It's a
        project that's really important to me personally, but also shines a
        light on some technical and philosophical issues regarding a life lived
        online. Let me explain...
      </p>
      <StyledImage src="/about/always-stef-fm.png" alt="Always Stef.FM" />
      <h3>Welcome to Stef.FM</h3>
      <p>
        This my new, heavily-work-in-progress, retro-themed music streaming
        service. It exclusively features mixes from my hugely talented friend
        Stefan Bauer. Stef sadly died last year. I've known him since the early
        2000s - possibly even the late nineties, I can't really remember. I
        think we first chatted on jamirotalk.net, a bulletin board for
        Jamiroquai fans. Stef slowly exposed his encyclopaedic knowledge of Acid
        Jazz, house, soul and jazz to the point where he eventually started up
        an online community called Music for the Soul and started releasing his
        mixes to the masses. To say he had impeccable musical taste and talent
        would be an understatement. But beyond this, he was such a nice man. So
        helpful, always welcoming.
      </p>
      <p>
        In his passing, he left behind hundreds (maybe even thousands?) of
        amazing mixes featuring the music from thousands of artists. Whilst a
        lot of his work is spread across the internet, I feared that gradually
        his subscriptions would be retired, or the service provider would close
        down, and his work would gradually disappear. Not cool. Also, the music
        was not necessarily always correctly licensed. This is something I
        wanted to address.
      </p>
      <p>
        So I began collating his work from all over the web. I'm using Mixcloud
        to host his music. I chose Mixcloud for several reasons: they're clearly
        passionate about music and ensuring artists get the remuneration they
        deserve. Mixcloud properly licenses all tracks, which as a hobbyist
        musician myself, is literally music to my ears. Also, they have a great
        API to get stuff out of their platform and into something custom-built,
        like Stef.FM.
      </p>
      <StyledImage src="/about/mixcloud.jpeg" alt="Mixcloud" />
      <p>
        It's a fun project in sad circumstances. But already this beta website
        has seen hundreds of users, somehow, and thousands of minutes
        listened-to. I feel somewhat validated already, despite featuring only
        ten of his mixes to date. There are at least 400 to go. I'll keep
        working on this in the coming months, enjoying the prospect of learning
        new techniques and bringing joy to listeners.
      </p>
      <h3>How to grieve for somebody you never met?</h3>
      <p>
        This is an interesting one. In the online world, I spend hours each day
        conversing with people I have never met, and probably never will. How
        does one grieve for somebody you only ever knew online? It's a strange
        feeling. Maybe you never even know for sure what happened to the person.
        They might just disappear one day. Or maybe, like Stef, the community
        rallies together and lends support to each other and the IRL friends and
        family of the deceased.
      </p>
      <p>
        For me, in this circumstance, I had to carry on Stef's mission. To Stef,
        I have no doubt I was just another name in a chat room. He probably
        thought no more about our relationship than this - and rightly so; I
        brought very little to the table. But for me, Stef was a genius. A
        curator not just of music, but of an entire community. I felt compelled
        to do *something* for him. And building Stef.FM is the best I can do.
      </p>
      <p>
        Earlier this year another of my internet friends died. Jonas Neubauer,
        many-time Classic Tetris World Champion and another community leader.
        Two great men gone forever. Or are they? The online response to his
        passing was staggering. It's difficult to describe. A funny feeling.
        Honestly, just take a look at his remembrance card at&nbsp;
        <a
          href="https://www.groupgreeting.com/sign/e7c9c3a2216a92b"
          target="_blank"
        >
          Group Greeting
        </a>
        . It's humbling.
      </p>
      <StyledImage src="/about/jonas.png" alt="Jonas Neubauer" />
      <h3> How to access the online 'stuff' of the deceased?</h3>
      <p>
        This was a challenge for me. Stef's online accounts are many and varied.
        I'm not entitled to any sort of access to them, nor would I expect to
        be. I contacted a few service providers to see what they could do, and
        rightly they informed me that they could only release his account to a
        family member who can provide proof of his death.
      </p>
      <p>
        But this leaves a gaping hole in the process of preserving someone's
        digital presence. If the family have no knowledge or interest recovering
        the deceased's accounts, what happens to them? They fizzle out.
      </p>
      <h3> Long-term preservation of digital assets</h3>
      <p>
        This is something that the likes of archive.org are taking seriously.
        But this still requires special, human attention on a per-case basis
        most/much of the time. Working on this project got me to thinking: there
        should probably be some formal process for the transferral of digital
        assets, much like as laid-out in a will. I'm sure this is the case for
        substantial digital products (i.e. businesses), but what about passion
        projects and hobbies? These are as much of a person's makeup as any of
        their IRL activities, but to my knowledge there is no 'standard' for
        transfer and preservation of someone's online life, beyond local policy.
      </p>
      <p>
        My thoughts around all of this are not fully formed at all. It's just
        something I've been thinking about for a few weeks as I try to fathom
        how I should feel and act in such circumstances. Also, in my day job we
        have been retiring lots of old platforms. For very good reasons, I
        should add. But a small part of me is sad at their demise. I mean, will
        I ever see a Google Search Appliance again? This was an important thing
        for a while. A milestone in internet history. Is it still useful?
        Absolutely not. Is it still important? Yes, it is.
      </p>
      <StyledImage
        src="/about/google-search-appliance.jpeg"
        alt="Google Search Appliance"
      />
      <p>
        Digital Preservation is an area I'll think about more deeply as I
        continue to collate this online museum for Stef. It's something I am
        very interested in, and would like this to be a part of my daily work
        going forward. In the mean time, I'm just going to enjoy some banging
        tunes, and hope beyond hope that Stef.FM becomes popular and his late
        genius achieves the audience it deserves.
      </p>
      <StyledImage
        src="/about/inimitable-stef-fm.png"
        alt="The Inimitable Stef.FM"
      />
      <h3>Credits and Thanks</h3>
      <ul>
        <li>
          Dustin Brett and his generous&nbsp;
          <a
            href="https://www.youtube.com/@DustinBrett"
            target="_blank"
            onClick={() => {
              // Analytics could be added here if needed
              console.log("Clicked Dustin Brett YouTube link");
            }}
          >
            YouTube tutorials
          </a>
          &nbsp;on React and general website development. I learned so much
          having followed your channel for several years. And you've been
          generous with your time, humouring my daft questions
        </li>
        <li>
          Lewis Hunt and his terrific&nbsp;
          <a
            href="https://github.com/lewhunt/mixmotion"
            target="_blank"
            onClick={() => {
              // Analytics could be added here if needed
              console.log("Clicked Lewis Hunt link");
            }}
          >
            Mixmotion library for Mixcloud
          </a>
          . You solved a lot of the hard problems I could not fathom with the
          Mixcloud API. And your generosity in answering my questions will
          always be appreciated.
        </li>
      </ul>
    </StyledAbout>
  );
};

export default About;
