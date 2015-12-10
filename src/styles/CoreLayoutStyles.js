import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '14pt';
const buttonTopMargin = '4px';
const errorTextMargin = '20px 0 0 30px';

export const styles = {
  mainContainer: {
    backgroundColor: MasterTheme.darkGray,
    zIndex: 100
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  name: {
    fontFamily: font,
    color: MasterTheme.orange,
    fontStyle: 'none',
    fontSize: '36px',
    fontWeight: MasterTheme.bold,
    marginTop: '30px',
    letterSpacing: '3px'
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  button: {
    float: 'left',
    marginRight: '30px',
    marginTop: buttonTopMargin,
    // marginBottom: buttonTopMargin,
    fontSize: fontsize,
    fontFamily: font
  },
  errorText: {
    margin: errorTextMargin,
    color: MasterTheme.orange
  },
  disabledText: {
    margin: errorTextMargin,
    color: MasterTheme.midGray
  },
  logo: {
    fill: MasterTheme.orange,  // this not working. I wish it did.
    width: '45px'
  },
  spinnerColor: MasterTheme.orange
};
