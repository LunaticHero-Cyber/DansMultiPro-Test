import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {JobInterface} from '@appTypes/job.type';
import {SIZES} from 'constants/sizes';
import {COLORS} from 'constants';
import {BoxSpace, Wrapper} from 'components/Common';

type JobCardStyleInterface = {
  card: ViewStyle;
  nameText: TextStyle;
  detailText: TextStyle;
  jobImage: ImageStyle;
};

const styles = StyleSheet.create<JobCardStyleInterface>({
  card: {
    padding: SIZES.medium,
    borderWidth: SIZES.outline,
    borderRadius: SIZES.extraSmall,
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
    alignSelf: 'center',
    width: SIZES.pinSpacing,
    height: SIZES.pinSpacing,
  },
});

const JobCard = ({job}: {job: JobInterface}) => {
  const {location, company, company_logo} = job;
  return (
    <Wrapper style={styles.card}>
      <Image
        style={styles.jobImage}
        source={{
          uri: company_logo,
        }}
      />
      <BoxSpace.C />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.nameText}>{company}</Text>
        <BoxSpace.A />
        <Text style={styles.detailText}>{company}</Text>
        <BoxSpace.A />
        <Text style={styles.detailText}>{location}</Text>
      </View>
    </Wrapper>
  );
};

export default JobCard;
