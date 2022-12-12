import React from 'react';
import {
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';

import {StackParamList} from '@navigators/Root';
import {Header, Container, BoxSpace, Wrapper} from 'components/Common';
import {COLORS, SIZES} from 'constants';

type JobDetailProp = StackNavigationProp<StackParamList, 'JobDetail'>;
type JobDetailRoute = RouteProp<StackParamList, 'JobDetail'>;

type JobDetailStyleInterface = {
  button: ViewStyle;
  mainContainer: ViewStyle;
  detailContainer: ViewStyle;
  keyText: TextStyle;
  keyValueText: TextStyle;
  backButtonText: TextStyle;
  nameText: TextStyle;
  detailText: TextStyle;
  jobImage: ImageStyle;
};

const styles = StyleSheet.create<JobDetailStyleInterface>({
  button: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.BLUE,
  },
  mainContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
  detailContainer: {
    padding: SIZES.medium,
    borderWidth: SIZES.outline,
    borderRadius: SIZES.extraSmall,
  },
  keyText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK40,
  },
  keyValueText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK100,
  },
  backButtonText: {
    color: COLORS.WHITE,
  },
  nameText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: SIZES.medium,
    color: COLORS.BLACK50,
  },
  jobImage: {
    width: '30%',
    height: '30%',
  },
});

const JobDetail = ({
  navigation,
  route,
}: {
  navigation: JobDetailProp;
  route: JobDetailRoute;
}) => {
  const {company_logo, company, location, title, type, description} =
    route?.params.job;

  const onBackButton = () => {
    navigation.goBack();
  };

  const generateFulltimeString = () => {
    if (type === 'Full Time') {
      return 'Yes';
    }

    return 'No';
  };

  const BackButton = () => (
    <TouchableOpacity onPress={onBackButton} style={styles.button}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header title="Job Detail" RenderAccessoryLeft={BackButton} />
      <View style={styles.mainContainer}>
        <Text style={styles.nameText}>Company</Text>
        <BoxSpace.A />
        <Wrapper style={styles.detailContainer}>
          <Image
            style={styles.jobImage}
            source={{
              uri: company_logo,
            }}
          />
          <BoxSpace.C />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.nameText}>{title}</Text>
            <BoxSpace.A />
            <Text style={styles.detailText}>{company}</Text>
            <BoxSpace.A />
            <Text style={styles.detailText}>{location}</Text>
          </View>
        </Wrapper>
        <BoxSpace.C />
        <Text style={styles.nameText}>Job Specification</Text>
        <BoxSpace.A />
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.detailContainer}>
            <Text style={styles.keyText}>Title</Text>
            <BoxSpace.A />
            <Text style={styles.keyValueText}>{title}</Text>
            <BoxSpace.C />
            <Text style={styles.keyText}>Fulltime</Text>
            <BoxSpace.A />
            <Text style={styles.keyValueText}>{generateFulltimeString()}</Text>
            <BoxSpace.C />
            <Text style={styles.keyText}>Description</Text>
            <RenderHtml source={{html: description}} />
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

export default JobDetail;
