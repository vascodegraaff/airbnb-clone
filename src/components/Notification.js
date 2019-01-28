import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import colors from '../styles/colors';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionValue: new Animated.Value(-70)
    };
    this.closeNotification = this.closeNotification.bind(this);
    this.animatedNotification = this.animatedNotification.bind(this);
  }

  animatedNotification(value) {
    const { positionValue } = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      duration: 300,
      velocity: 3,
      tenstion: 2,
      friction: 8,
      easing: Easing.easeOutBack
    }).start();
  }

  closeNotification() {
    this.props.handleCloseNotification();
  }
  render() {
    const { type, firstLine, secondLine, showNotification } = this.props;
    const { positionValue } = this.state;
    showNotification
      ? this.animatedNotification(0)
      : this.animatedNotification(-70);
    return (
      <Animated.View style={[{ marginBottom: positionValue }, styles.wrapper]}>
        <View style={styles.notificationContent}>
          <Text style={styles.errorText}>{type}</Text>
          <Text style={styles.errorMessage}>{firstLine}</Text>
          <Text style={styles.errorMessage}>{secondLine}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification}
        >
          <Icon name="times" size={24} color={colors.lightGray} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  showNotification: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  handleCloseNotification: PropTypes.func
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    height: 70,
    width: '100%',
    padding: 10
  },
  notificationContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  errorText: {
    color: colors.darkOrange,
    marginRight: 5,
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '700'
  },
  errorMessage: {
    marginBottom: 2,
    fontSize: 16
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 10
  }
});
