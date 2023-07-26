import React, { useEffect, useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Modalbox from 'react-native-modalbox';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { extendMoment } from 'moment-range';
import Moment from 'moment/moment';
import { gutters, Palette } from '../styles';
import Button from '../components/Buttons/Button';
import { icons } from '../assets';

const moment = extendMoment(Moment);

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default function RangeCalendarModal({
  isOpen = false,
  maxDate = null,
  minDate = null,
  initialRange = [],
  onRangeSelected = (days) => {
    console.log({ days });
  },
  insets = {
    bottom: 0,
    top: 0,
  },
  theme = {
    primary: Palette.primary,
    halfPrimary: Palette.primary, // for selected day background in range
    modalBackdrop: 'rgba(16, 15, 15, 0.7)',
    backgroundColor: Palette.mainBlack,
    dayBackgroundColor: Palette.darkPurple,
    text: Palette.mainWhite,
    selectedDay: Palette.mainWhite,
    disableDay: Palette.mainGrey,
    fontFamily: 'DMSans-Regular',
    iconColor: Palette.mainWhite,
    iconBackgroundColor: Palette.darkGrey,
    monthTextSize: 20,
    dayTextSize: 16,
  },
  arrowSize = responsiveWidth(9),
  modalStyle = {},
  calendarStyle = {},
  dayContainerStyle = {},
  dayTextStyle = {},
  buttonStyle = {},
}) {
  const [markedDays, setMarkedDays] = useState({});
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (initialRange.length === 2) {
      setDays([
        moment(initialRange[0]).format('YYYY-MM-DD'),
        moment(initialRange[1]).format('YYYY-MM-DD'),
      ]);
    }
  }, [initialRange]);

  function period(day) {
    let _days = Array.from(days);

    if (_days.length < 2 && moment(days[0]).isBefore(moment(day))) {
      _days.push(day);
    } else {
      _days = [day];
    }

    if (typeof setDays === 'function') {
      setDays(_days.sort((a, b) => moment(b).isBefore(a)));
    }
  }

  useEffect(() => {
    let tmp = {};
    if (days.length === 1) {
      tmp[days[0]] = {
        startingDay: true,
        endingDay: true,
        color: theme.primary,
      };
    } else if (days.length === 2) {
      days.sort((a, b) => a > b);
      const selectedDates = moment.range(days[0], days[1]);
      const arrayDates = Array.from(selectedDates.by('day'));
      tmp[days[0]] = { startingDay: true, color: theme.primary };
      tmp[days[1]] = {
        ...tmp[days[1]],
        color: theme.primary,
        endingDay: true,
      };
      arrayDates.forEach(
        (date) =>
          (tmp[moment(date).format('YYYY-MM-DD')] = {
            color: theme.halfPrimary,
            ...tmp[moment(date).format('YYYY-MM-DD')],
            textColor: theme.selectedDay,
          })
      );
    }
    setMarkedDays(tmp);
  }, [days]);

  return (
    <Modalbox
      style={{
        height: responsiveHeight(70) - insets.bottom,
        backgroundColor: theme.backgroundColor,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        ...modalStyle,
      }}
      useNativeDriver={true}
      backdropColor={theme.modalBackdrop}
      animationDuration={500}
      backdrop={true}
      backdropPressToClose={false}
      backButtonClose={false}
      swipeToClose={false}
      position={'bottom'}
      coverScreen={true}
      isOpen={isOpen}
    >
      <Calendar
        style={{
          paddingTop: responsiveHeight(1),
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: theme.backgroundColor,
          ...calendarStyle,
        }}
        current={moment().format('YYYY-MM-DD')}
        minDate={
          minDate
            ? moment(minDate).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD')
        }
        maxDate={maxDate ? moment(maxDate).format('YYYY-MM-DD') : null}
        markingType={'period'}
        onDayPress={(day) => period(day.dateString)}
        markedDates={markedDays}
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        monthFormat={'MMMM  yyyy'}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        renderArrow={(direction) => (
          <View
            style={{
              width: arrowSize,
              height: arrowSize,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.iconBackgroundColor,
              borderRadius: 100,
            }}
          >
            <Image
              resizeMode={'contain'}
              style={{
                width: arrowSize * 0.4,
                height: arrowSize * 0.4,
                tintColor: theme.iconColor,
                transform: direction === 'left' ? [] : [{ rotate: '180deg' }],
              }}
              source={icons.back2}
            />
          </View>
        )}
        dayComponent={(date) => {
          const {
            date: { day, dateString },
            marking = {},
            state,
          } = date;
          const { color = null } = marking;
          const isToday = state === 'today';
          const isDisabled = state === 'disabled';
          return (
            <TouchableOpacity
              disabled={isDisabled}
              onPress={() => period(dateString)}
              style={{
                height: responsiveHeight(5.5),
                width: '92%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: isDisabled
                  ? 'transparent'
                  : color || theme.dayBackgroundColor,
                borderColor: theme.primary,
                borderWidth: isToday ? 1 : 0,
                marginBottom: '8%',
                ...dayContainerStyle,
              }}
            >
              <Text
                style={{
                  color: isDisabled ? theme.disableDay : theme.selectedDay,
                  ...dayTextStyle,
                }}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        }}
        theme={{
          'calendarBackground': theme.backgroundColor,
          'textSectionTitleColor': theme.backgroundColor,
          'stylesheet.calendar.main': {
            week: {
              flexDirection: 'row',
              margin: 0,
            },
            container: {
              paddingHorizontal: responsiveWidth(2),
            },
          },
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: gutters / 2,
              marginBottom: responsiveHeight(1),
            },
            monthText: {
              fontSize: theme.monthTextSize,
              fontFamily: theme.fontFamily,
              fontWeight: 'bold',
              color: theme.text,
            },
            arrowImage: {
              tintColor: theme.iconBackgroundColor,
            },
            dayHeader: {
              color: theme.text,
              fontSize: theme.dayTextSize,
              fontFamily: theme.fontFamily,
              fontWeight: '700',
              marginBottom: responsiveHeight(1),
            },
          },
        }}
      />
      <Button
        disabled={days.length !== 2}
        onPress={() => {
          onRangeSelected([
            moment(days[0], 'YYYY-MM-DD').toDate(),
            moment(days[1], 'YYYY-MM-DD').toDate(),
          ]);
        }}
        style={{
          backgroundColor: days.length !== 2 ? theme.disableDay : theme.primary,
        }}
        containerStyle={{
          width: 'auto',
          position: 'absolute',
          left: gutters,
          right: gutters,
          bottom: insets.bottom || responsiveHeight(2),
          ...buttonStyle,
        }}
        textColor={theme.text}
        text={'Valider'}
      />
    </Modalbox>
  );
}
