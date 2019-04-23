import { StyleSheet } from 'react-native';
import { BACKGROUND, BUTTON_BACKGROUND, CARD_TEXT } from "styles/Colors";
import { PADDINGH, PADDINGL } from "styles/Sizes";


export default StyleSheet.create({
    app: {
        padding: PADDINGL,
        flex: 1,
        backgroundColor: BACKGROUND
    },
    add_calendar: {
        borderRadius: 30,
        height: 60,
        width: 60,
        backgroundColor: BUTTON_BACKGROUND,
        alignSelf: 'flex-end'
    },
    calendar_card: {
        borderRadius: 40
    },
    calendar_card_text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color:CARD_TEXT
    }
  });