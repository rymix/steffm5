import { useTheme } from "contexts/theme";
import React from "react";
import { VOLUME_AVAILABLE } from "utils/constants";
import { getModalThemeMode } from "utils/themeHelpers";

import {
  CautionIcon,
  StyledControl,
  StyledGrid,
  StyledGridDetail,
  StyledGridHeader,
  StyledIconSection,
  StyledManual,
  StyledManualFooter,
  StyledManualSectionTitle,
  StyledManualSubTitle,
  StyledManualTitle,
} from "components/Manual/StyledManual";
import {
  StyledManualButton,
  StyledManualButtonLabel,
  StyledManualButtonWrapper,
  StyledManualLed,
} from "components/Manual/StyledManualButton";
import {
  StyledManualDialTick,
  StyledManualGrip,
  StyledManualInnerKnob,
  StyledManualKnobLabel,
  StyledManualKnobMarker,
  StyledManualKnobWrapper,
  StyledManualOuterKnob,
  StyledManualOuterKnobWrapper,
} from "components/Manual/StyledManualKnob";
import {
  StyledManualProgressLed,
  StyledManualProgressLedsItemsWrapper,
  StyledManualProgressLedsWrapper,
} from "components/Manual/StyledManualProgressLeds";
import {
  StyledManualProgress,
  StyledManualScreen,
  StyledManualScreenWrapper,
} from "components/Manual/StyledManualScreen";

export const Manual: React.FC = () => {
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);

  // Static categories for display in manual (same angles as real dial)
  const modeMaxAngle = 115;
  const modeStepAngle = (modeMaxAngle * 2) / 5; // 46 degrees per step
  const modeLabels = ["All", "Adv", "Shoes", "Cock", "Spec", "Fav"];
  const categories = modeLabels.map((label, i) => ({
    shortName: label,
    angle: -modeMaxAngle + i * modeStepAngle,
  }));

  return (
    <StyledManual $themeMode={modalThemeMode}>
      <StyledManualTitle>STEF.FM</StyledManualTitle>
      <hr />
      <StyledManualSubTitle>User Manual</StyledManualSubTitle>
      <StyledManualSectionTitle>Introduction</StyledManualSectionTitle>
      <hr />
      <p>
        The <strong>STEF.FM</strong> funky, funky house music player is
        polyphonic streaming audio virtual device built for your listening
        pleasure. Press buttons, rotate knobs and move sliders to make the music
        happen.
      </p>
      <p>
        This manual explains how to make the most of your{" "}
        <strong>STEF.FM</strong> experience.
      </p>
      <StyledIconSection>
        <CautionIcon $themeMode={modalThemeMode} /> Warning! The funk is strong.
        Proceed with caution.
      </StyledIconSection>
      <StyledManualSectionTitle>
        Mixcloud Status Indicator
      </StyledManualSectionTitle>
      <hr />
      <StyledControl>
        <StyledManualProgressLedsWrapper>
          <StyledManualProgressLedsItemsWrapper $displayLength={11}>
            <StyledManualProgressLed key="mixcloud-indicator" />
          </StyledManualProgressLedsItemsWrapper>
        </StyledManualProgressLedsWrapper>
      </StyledControl>{" "}
      <p>
        The <strong>MIXCLOUD STATUS INDICATOR LED</strong> is a light which is
        connected directly to the Mixcloud music servers by a very long cable.
        It goes green when the cable is plugged in correctly by the under-paid
        intern at the other end.
      </p>
      <StyledManualSectionTitle>Display Screen</StyledManualSectionTitle>
      <hr />
      <StyledControl>
        <StyledManualScreenWrapper $displayLength={8}>
          <StyledManualScreen $displayLength={8}>ADVENTUR</StyledManualScreen>
          <StyledManualProgress $displayLength={8}>
            ==______
          </StyledManualProgress>
        </StyledManualScreenWrapper>
      </StyledControl>
      <p>
        The <strong>DISPLAY SCREEN</strong> features a variable-length
        multi-segment display. Its content is updated automatically with the
        most recent mixes and tracks. Occasional messages are displayed when the
        time is right.
      </p>
      <StyledManualSectionTitle>Progress Indicator</StyledManualSectionTitle>
      <hr />
      <StyledControl>
        <StyledManualScreenWrapper $displayLength={8}>
          <StyledManualProgress $displayLength={8}>
            ==______
          </StyledManualProgress>
        </StyledManualScreenWrapper>
      </StyledControl>
      <p>
        The <strong>PROGRESS INDICATOR</strong> shows the playback progress of
        the current mix. The progress bar fills in sequence to indicate the
        current playhead position proportional to the overall length of the mix.
      </p>
      <StyledManualSectionTitle>Select</StyledManualSectionTitle>
      <hr />
      <p>
        The <strong>SELECT</strong> knob allows you to dial in the sounds of
        your preference. Rotate it to choose between:
      </p>
      <StyledControl>
        <StyledManualKnobWrapper>
          <StyledManualOuterKnobWrapper>
            {categories.map((category) => (
              <StyledManualKnobMarker
                key={category.shortName}
                $angle={category.angle}
                $themeMode={modalThemeMode}
              >
                {category.shortName}
              </StyledManualKnobMarker>
            ))}
            <StyledManualOuterKnob>
              <StyledManualInnerKnob $deg={-45} $snap={1}>
                <StyledManualGrip />
              </StyledManualInnerKnob>
            </StyledManualOuterKnob>
          </StyledManualOuterKnobWrapper>
          <StyledManualKnobLabel $themeMode={modalThemeMode}>
            Category
          </StyledManualKnobLabel>
        </StyledManualKnobWrapper>
      </StyledControl>
      <StyledGrid>
        <StyledGridHeader>ALL</StyledGridHeader>
        <StyledGridDetail>
          <strong>ALL THE MUSIC</strong>
          <br />
          No filters, no holds barred. This is what you came here for. Dial up{" "}
          <strong>EVERYTHING</strong> and listen until tomorrow.
        </StyledGridDetail>
        <StyledGridHeader>ADV</StyledGridHeader>
        <StyledGridDetail>
          <strong>ADVENTURES IN DECENT MUSIC</strong>
          <br />
          It's soulful, it's groovy, it's low-volume. But most of all it's{" "}
          <strong>DECENT</strong>.
        </StyledGridDetail>
        <StyledGridHeader>SHOES</StyledGridHeader>
        <StyledGridDetail>
          <strong>MY PAIR OF SHOES</strong>
          <br />
          It can be deep, it can but funkier than holy hell, it can be jazzy.
          It's always <strong>HOUSE</strong> and them shoes, they be{" "}
          <strong>COMFY</strong>.
        </StyledGridDetail>
        <StyledGridHeader>COCK</StyledGridHeader>
        <StyledGridDetail>
          <strong>COCKSOUP DJ COLLECTIVE</strong>
          <br />
          The fuse is lit and I'm about to go <strong>BOOM!</strong> Put on your
          loafers, run your fingers through your flowing mullett and relax to
          some soothing, beautiful <strong>JAZZ FUSION</strong>.
        </StyledGridDetail>
        <StyledGridHeader>SPEC</StyledGridHeader>
        <StyledGridDetail>
          <strong>SPECIAL MIXES</strong>
          <br />
          It's different, it's exceptional, it's <strong>SPECIAL</strong>. You
          won't guess what's coming next and that's why you love it.
        </StyledGridDetail>
        <StyledGridHeader>FAV</StyledGridHeader>
        <StyledGridDetail>
          <strong>FAVOURITES</strong>
          <br />
          All your favourite mixes all in one place.
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>Control</StyledManualSectionTitle>
      <hr />
      <p>
        Press the button and things will happen. The things that will happen are
        described below.
      </p>
      <StyledControl>
        <StyledManualButtonWrapper>
          <StyledManualLed $themeMode={modalThemeMode} />
          <StyledManualButton $themeMode={modalThemeMode} />
          <StyledManualButtonLabel $themeMode={modalThemeMode}>
            Button
          </StyledManualButtonLabel>
        </StyledManualButtonWrapper>
      </StyledControl>
      <StyledGrid>
        <StyledGridHeader>PLAY / PAUSE</StyledGridHeader>
        <StyledGridDetail>
          <strong>MAKE BEAUTIFUL MUSIC</strong>
          <br />
          Press this button to make the music begin. You will not be
          disappointed. Pressing it again will make the music cease.
          <strong>NEVER</strong> cease the music. If you press cease the music,
          sadness will ensue. You have been warned.
          <br />
          <em>Keypress K, Spacebar</em>
        </StyledGridDetail>
        <StyledGridHeader>PREV</StyledGridHeader>
        <StyledGridDetail>
          <strong>PREVIOUS MIX</strong>
          <br />
          Go to the previous mix in the current selection.
          <br />
          <em>Keypress J</em>
        </StyledGridDetail>
        <StyledGridHeader>NEXT</StyledGridHeader>
        <StyledGridDetail>
          <strong>NEXT MIX</strong>
          <br />
          Go to the next mix in the current selection.
          <br />
          <em>Keypress L</em>
        </StyledGridDetail>
        <StyledGridHeader>RANDOM</StyledGridHeader>
        <StyledGridDetail>
          <strong>RANDOM MIX</strong>
          <br />
          Play a random mix in the current selection.
          <br />
          <em>Keypress R</em>
        </StyledGridDetail>
        <StyledGridHeader>SHUFFLE</StyledGridHeader>
        <StyledGridDetail>
          <strong>SHUFFLE</strong>
          <br />
          Play a random mix in the current selection when the current one
          finishes.
          <br />
          <strong>NOTE:</strong> This button ignores the current selection.
          <br />
          <em>Keypress N</em>
        </StyledGridDetail>
        <StyledGridHeader>FAV</StyledGridHeader>
        <StyledGridDetail>
          <strong>ADD MIX TO FAVOURITES</strong>
          <br />
          Keep track of your favourite mixes. Click the <strong>
            FAV
          </strong>{" "}
          button and <strong>STEF.FM</strong> will remember how much you love
          this mix. Your favourited mixes will appear under the{" "}
          <strong>FAV</strong> selection as well as in the{" "}
          <strong>Favourites</strong> section of the <strong>LIST</strong> mode.
          <br />
          <em>Keypress F</em>
        </StyledGridDetail>
        <StyledGridHeader>SHARE</StyledGridHeader>
        <StyledGridDetail>
          <strong>SHARE THE CURRENT MIX</strong>
          <br />
          Click the <strong>SHARE</strong> button to copy a shareable link to
          your clipboard. Paste this into your social posts or send the link to
          a friend. Share the music and share the love.
          <br />
          <em>Keypress S</em>
        </StyledGridDetail>
      </StyledGrid>
      {VOLUME_AVAILABLE && (
        <StyledControl>
          <StyledManualKnobWrapper>
            <StyledManualOuterKnobWrapper>
              {Array.from({ length: 11 }).map((_, i) => {
                const volumeMaxAngle = 150;
                const angle = -volumeMaxAngle + (i * (volumeMaxAngle * 2)) / 10;
                return (
                  <StyledManualDialTick
                    key={i}
                    $angle={angle}
                    $themeMode={modalThemeMode}
                  />
                );
              })}
              <StyledManualOuterKnob>
                <StyledManualInnerKnob $deg={150} $snap={0}>
                  <StyledManualGrip />
                </StyledManualInnerKnob>
              </StyledManualOuterKnob>
            </StyledManualOuterKnobWrapper>
            <StyledManualKnobLabel $themeMode={modalThemeMode}>
              Volume
            </StyledManualKnobLabel>
          </StyledManualKnobWrapper>
        </StyledControl>
      )}
      <StyledGrid>
        <StyledGridHeader>VOL</StyledGridHeader>
        <StyledGridDetail>
          <strong>CHANGE VOLUME</strong>
          <br />
          Moving this slider makes the funky house noises get either louder or
          quieter depending on the position of the slider. If you would like
          louder rare grooves in your ear then move the slider upwards. For a
          more chilled listening experience then moving the slider downwards
          will satisfy your desires.
          <br />
          <em>Keypress Up, Down, M to mute</em>
          <br />
          <br />
          <StyledIconSection>
            <CautionIcon $themeMode={modalThemeMode} /> Moving the slider
            towards the bottom may make the music too quiet. Do not do this.
          </StyledIconSection>
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>List Mode</StyledManualSectionTitle>
      <hr />
      <p>
        The <strong>LIST</strong> button brings up the full detailed list of all
        mixes and tracks. You can filter and search the list to finx your
        favourite music. List Mode also shows the most recently uploaded mixes
        so you can always keep up to date with the new sounds features on{" "}
        <strong>STEF.FM</strong>.
      </p>
      <StyledGrid>
        <StyledGridHeader>FILTER</StyledGridHeader>
        <StyledGridDetail>
          <strong>FILTER MIXES</strong>
          <br />
          Filter the mixes to show you only:
          <ul>
            <li>All Mixes</li>
            <li>Adventures in Decent Music</li>
            <li>My Pair of Shoes</li>
            <li>Special</li>
            <li>Cocksoup</li>
            <li>
              Favourites - see all the mixes that you have favourited during
              your listening journey
            </li>
          </ul>
        </StyledGridDetail>
        <StyledGridHeader>SEARCH</StyledGridHeader>
        <StyledGridDetail>
          <strong>SEARCH MIXES AND TRACKS</strong>
          <br />
          Type words in the search box to find mixes and tracks which match
          those words. The matching mixes will be displayed below the search
          box, if matches were found. If no matches were found, no matches will
          be shown.
        </StyledGridDetail>
        <StyledGridHeader>LATEST</StyledGridHeader>
        <StyledGridDetail>
          <strong>SEE THE LATEST MIXES</strong>
          <br />
          The most recently uploaded mixes are displayed here in reverse date
          order.
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>Menu</StyledManualSectionTitle>
      <hr />
      <p>
        The <strong>Menu</strong> is a menu of menu items. Clicking on a menu
        item shows the relavant information. You may be familiar with this
        concept from other internet applications, many of which feature similar
        menu systems to aid navigation and improve the user experience.
      </p>
      <StyledGrid>
        <StyledGridHeader>ABOUT</StyledGridHeader>
        <StyledGridDetail>
          <strong>INFORMATION ABOUT STEF.FM</strong>
          <br />
          This function is not dissimilar to the <strong>ABOUT</strong> button
          in its functionality in that it is identical in its functionality
          because it does the same thing.
        </StyledGridDetail>
        <StyledGridHeader>CONTACT</StyledGridHeader>
        <StyledGridDetail>
          <strong>HOW TO CONTACT THE MAKERS OF STEF.FM</strong>
        </StyledGridDetail>

        <StyledGridHeader>EMAIL</StyledGridHeader>
        <StyledGridDetail>
          An electronic mail reference, enabling you to send digital messages
          via your favourite electronic mail client.
        </StyledGridDetail>
        <StyledGridHeader>INSTAGRAM</StyledGridHeader>
        <StyledGridDetail>
          Instagram is a social media network where some humans share electronic
          photographs of themselves as well as the occasional moving digital
          lithograh.
        </StyledGridDetail>
        <StyledGridHeader>MANUAL</StyledGridHeader>
        <StyledGridDetail>
          <strong>VIEW THIS USER MANUAL</strong>
          <br />
          The <strong>USER MANUAL</strong> is a document which explains how to
          user the <strong>STEF.FM</strong> digital audio device. The guide is
          thorough and detailed and invaluable to aiding your listening
          experience.
        </StyledGridDetail>
        <StyledGridHeader>STATISTICS</StyledGridHeader>
        <StyledGridDetail>
          <strong>STATISTICS ANS OTHER VITAL INFORMATION</strong>
          <br />
          View important information about the <strong>STEF.FM</strong> digital
          audio device including:
          <ul>
            <li>The total number of mixes</li>
            <li>The total running duration of all music</li>
            <li>The most popular artist, remix artists and publishers</li>
            <li>
              Other information vital to your continued listening pleasure
            </li>
          </ul>
        </StyledGridDetail>
        <StyledGridHeader>WALLPAPER</StyledGridHeader>
        <StyledGridDetail>
          <strong>CHANGE THE BACKGROUND IMAGE</strong>
          <br />
          An often overlooked aspect of the visual user interfaces experience is
          enabling users to customise their experience to their preference. The{" "}
          <strong>WALLPAPER</strong> menu item allows you to change the
          background image of the <strong>STEF.FM</strong> digital audio device
          to a number of historically significant images from computing history,
          including:
          <ul>
            <li>Tabletop</li>
            <li>Windows 3.1</li>
            <li>Windows 95</li>
            <li>Windows XP</li>
            <li>System 7</li>
          </ul>
          You may be pleased to learn that the <strong>WALLPAPER</strong>{" "}
          selection screen simulates a vintage computing experience for your
          delectation.
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>Keyboard Shortcuts</StyledManualSectionTitle>
      <hr />
      <p>Press the keys to do the things.</p>
      <StyledGrid>
        <StyledGridHeader>SPACE BAR OR K</StyledGridHeader>
        <StyledGridDetail>Toggle Play/Stop</StyledGridDetail>
        <StyledGridHeader>J</StyledGridHeader>
        <StyledGridDetail>Previous Track</StyledGridDetail>
        <StyledGridHeader>L</StyledGridHeader>
        <StyledGridDetail>Next Track</StyledGridDetail>
        <StyledGridHeader>M</StyledGridHeader>
        <StyledGridDetail>Mute</StyledGridDetail>
        <StyledGridHeader>UP</StyledGridHeader>
        <StyledGridDetail>Increase volume</StyledGridDetail>
        <StyledGridHeader>DOWN</StyledGridHeader>
        <StyledGridDetail>Decrease volume</StyledGridDetail>
        <StyledGridHeader>R</StyledGridHeader>
        <StyledGridDetail>Load random track</StyledGridDetail>
        <StyledGridHeader>N</StyledGridHeader>
        <StyledGridDetail>Load latest/newest track</StyledGridDetail>
        <StyledGridHeader>F</StyledGridHeader>
        <StyledGridDetail>Toggle favourite mix</StyledGridDetail>
        <StyledGridHeader>S</StyledGridHeader>
        <StyledGridDetail>Copy shareable link to clipboard</StyledGridDetail>
        <StyledGridHeader />
        <StyledGridDetail />
      </StyledGrid>
      <StyledManualSectionTitle>Specifications</StyledManualSectionTitle>
      <hr />
      <StyledGrid>
        <StyledGridHeader>AMPLIFIER POWER</StyledGridHeader>
        <StyledGridDetail>
          Measured in decibels of pure enthusiasm
        </StyledGridDetail>

        <StyledGridHeader>ANTENNA</StyledGridHeader>
        <StyledGridDetail>There is no antenna</StyledGridDetail>

        <StyledGridHeader>BASS RESPONSE</StyledGridHeader>
        <StyledGridDetail>Slapper</StyledGridDetail>

        <StyledGridHeader>BROWSER COMPATIBILITY</StyledGridHeader>
        <StyledGridDetail>Pretty, pretty good</StyledGridDetail>

        <StyledGridHeader>BUTTONS</StyledGridHeader>
        <StyledGridDetail>
          Multi-functional pressable operative function single-throw switch
          blocks
        </StyledGridDetail>

        <StyledGridHeader>HUMIDITY RESISTANCE</StyledGridHeader>
        <StyledGridDetail>Moist</StyledGridDetail>

        <StyledGridHeader>JOY</StyledGridHeader>
        <StyledGridDetail>Endless</StyledGridDetail>

        <StyledGridHeader>KNOB</StyledGridHeader>
        <StyledGridDetail>Rotatable</StyledGridDetail>

        <StyledGridHeader>LIGHT INDICATOR</StyledGridHeader>
        <StyledGridDetail>
          Glows with the intensity of a thousand ideas
        </StyledGridDetail>

        <StyledGridHeader>MAXIMUM VOLUME</StyledGridHeader>
        <StyledGridDetail>11</StyledGridDetail>

        <StyledGridHeader>OUTPUT RANGE</StyledGridHeader>
        <StyledGridDetail>From low-volume to floor-filling</StyledGridDetail>

        <StyledGridHeader>PLUG COMPATIBILITY</StyledGridHeader>
        <StyledGridDetail>
          Fits most sockets, unless they're too small. Or too big
        </StyledGridDetail>

        <StyledGridHeader>SHUFFLE MODE</StyledGridHeader>
        <StyledGridDetail>
          Randomised with the wisdom of ancient algorithms
        </StyledGridDetail>

        <StyledGridHeader>SONGS</StyledGridHeader>
        <StyledGridDetail>
          Funky, soulful, groovy, deep and masterful
        </StyledGridDetail>
      </StyledGrid>
      <StyledManualSectionTitle>Notes</StyledManualSectionTitle>
      <hr />
      <p>
        <a href="mailto:webmaster@stef.fm">webmaster@stef.fm</a>
        <br />
        Copyright © 2021 - {new Date().getFullYear()}
        <br />
        Some rights reserved
      </p>
      <StyledManualFooter>STEF.FM</StyledManualFooter>
    </StyledManual>
  );
};

export default Manual;
