import { StyleSheet } from 'react-native';
import {
    BACKGROUND,
    BUTTON_BACKGROUND,
    CARD_TEXT,
    CALENDAR_COLORS_DEFAULT,
    DELETE_BUTTON_BACKGROUND
} from "styles/Colors";
import { PADDINGL, MARGINL } from "styles/Sizes";


export default StyleSheet.create({
    app: {
        padding: PADDINGL,
        flex: 1,
        backgroundColor: BACKGROUND
    },


    calendar_card: {
        borderRadius: 40
    },
    calendar_card_text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color:CARD_TEXT
    },
    calendar_delete_button: {
        backgroundColor: DELETE_BUTTON_BACKGROUND,
        marginTop: MARGINL,
    },


    add_calendar: {
        borderRadius: 30,
        height: 60,
        width: 60,
        backgroundColor: BUTTON_BACKGROUND,
        alignSelf: 'flex-end'
    },
    add_calendar_colorselector: {
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: CALENDAR_COLORS_DEFAULT
    },
  });