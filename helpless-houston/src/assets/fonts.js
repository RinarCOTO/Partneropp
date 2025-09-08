// Import font files
import satoshiVariable from '/public/fonts/Satoshi-Variable.ttf';
import robotoFlexWoff from '/public/fonts/RobotoFlex.woff2';
import robotoFlexTtf from '/public/fonts/RobotoFlex-Variable.ttf';
import dmSans from '/public/fonts/DMSans-VariableFont.ttf';

// Export font URLs
export const fonts = {
  satoshiVariable: satoshiVariable,
  robotoFlexWoff: robotoFlexWoff,
  robotoFlexTtf: robotoFlexTtf,
  dmSans: dmSans
};

// Generate CSS for fonts
export const fontFaces = `
  @font-face {
    font-family: 'Satoshi Black';
    src: url('${satoshiVariable}') format('truetype');
    font-weight: 100 900;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto woff';
    src: url('${robotoFlexWoff}') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('${robotoFlexTtf}') format('truetype');
    font-weight: 100 900;
    font-display: swap;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('${dmSans}') format('truetype');
    font-weight: 700;
    font-display: swap;
  }
`;
