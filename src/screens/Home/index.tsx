import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import {JobInterface} from '@appTypes/job.type';
import {StackParamList} from '@navigators/Root';
import {Header, Container, BoxSpace, Wrapper} from 'components/Common';
import {JobCard} from 'components/Card';
import {COLORS, SIZES} from 'constants';
import {fetchJobsList} from 'services/get/fetchJobsList';
import {addJobList, emptyJobList} from 'reducer/reducers';

type OrderRequestDetailScreenProp = StackNavigationProp<StackParamList, 'Home'>;

type HomeStyleInterface = {
  addJobButton: ViewStyle;
  inputContainer: ViewStyle;
  pageHandlerContainer: ViewStyle;
  emptyContainer: ViewStyle;
  scrollContainer: ViewStyle;
  input: ViewStyle;
  addJobButtonText: TextStyle;
  emptyHeadlineText: TextStyle;
  emptyTaglineText: TextStyle;
};

const styles = StyleSheet.create<HomeStyleInterface>({
  addJobButton: {
    borderRadius: SIZES.extraSmall,
    padding: SIZES.medium,
    backgroundColor: COLORS.BLUE,
  },
  inputContainer: {
    paddingHorizontal: SIZES.small,
  },
  pageHandlerContainer: {
    paddingHorizontal: SIZES.small,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    padding: SIZES.small,
  },
  input: {
    borderRadius: SIZES.extraSmall,
    borderWidth: SIZES.outline,
    backgroundColor: COLORS.BLACK10,
    padding: SIZES.medium,
  },
  addJobButtonText: {
    color: COLORS.WHITE,
  },
  emptyHeadlineText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.BLACK100,
  },
  emptyTaglineText: {
    fontSize: SIZES.large,
    color: COLORS.BLACK40,
  },
});

const Home = ({navigation}: {navigation: OrderRequestDetailScreenProp}) => {
  const responseJobList = useSelector(state => state.jobList);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorResponse, setErrorResponse] = useState<any>();

  const [filteredJobList, setFilteredJobList] = useState<Array<JobInterface>>(
    [],
  );
  const [renderedJobList, setRenderedJobList] = useState<Array<JobInterface>>(
    [],
  );

  const totalNumberOfJobs = responseJobList?.length;
  const numberOfJobLimit = 10;
  const jobListHasRemainder = totalNumberOfJobs % numberOfJobLimit;

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onPressErrorRetryButton = () => {
    setIsError(false);
    setIsLoading(true);
    handleFetchingJobList();
  };

  const goToNextPage = () => {
    if (currentPage + 1 > totalPage) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage - 1 < 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const handleSearchInputChanged = (text: string) => {
    setSearchInput(text);
  };

  const handlePageTotal = (numberOfJobs: number) => {
    setTotalPage(
      Math.floor(numberOfJobs / numberOfJobLimit) +
        (jobListHasRemainder ? 1 : 0),
    );
  };

  const handlePageJobs = (page: number) => {
    const firstIndexOfThePage = numberOfJobLimit * (page - 1);
    const lastIndexOfThePage =
      currentPage !== totalPage
        ? numberOfJobLimit * page
        : filteredJobList?.length;
    const shownJob = filteredJobList?.slice(
      firstIndexOfThePage,
      lastIndexOfThePage,
    );
    setRenderedJobList(shownJob);
  };

  const handleFetchingJobList = async () => {
    try {
      const jobs = await fetchJobsList();
      dispatch(addJobList(jobs));
    } catch (error) {
      setIsError(true);
      setErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isJobEmpty = () => {
    return !filteredJobList?.length;
  };

  const isJobPageMoreThanOne = useCallback(() => {
    return totalPage > 1;
  }, [totalPage]);

  const RenderPageHandler = () =>
    !isJobEmpty() && isJobPageMoreThanOne() ? (
      <Wrapper style={styles.pageHandlerContainer}>
        <Button title="<" onPress={goToPreviousPage} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{`${currentPage}/${totalPage}`}</Text>
        </View>
        <Button title=">" onPress={goToNextPage} />
      </Wrapper>
    ) : (
      <></>
    );

  const RenderErrorMessage = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeadlineText}>Error loading the data</Text>
      <Text style={styles.emptyTaglineText}>{errorResponse?.message}</Text>
      <BoxSpace.A />
      <Button title="Retry" onPress={onPressErrorRetryButton} />
    </View>
  );

  const RenderLoadingScreen = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeadlineText}>Loading data...</Text>
      <Text style={styles.emptyTaglineText}>Please wait for a moment</Text>
    </View>
  );

  const RenderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeadlineText}>The list is currently empty</Text>
      <Text style={styles.emptyTaglineText}>Please ADD new job</Text>
    </View>
  );

  const RenderJob = ({item}: {item: JobInterface}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('JobDetail', {job: item})}>
        <JobCard key={item.id} job={item} />
        <BoxSpace.B />
      </TouchableOpacity>
    );
  };

  const RenderList = () =>
    useMemo(() => {
      return (
        <FlatList
          style={styles.scrollContainer}
          data={renderedJobList}
          renderItem={RenderJob}
          keyExtractor={item => item.id}
        />
      );
    }, [JSON.stringify(renderedJobList)]);

  const HandleRenderLoading = () => (
    <View style={{flex: 1}}>
      {isLoading ? <RenderLoadingScreen /> : <HandleRenderError />}
    </View>
  );

  const HandleRenderError = () => (
    <View style={{flex: 1}}>
      {!isError ? <RenderMainContainer /> : <RenderErrorMessage />}
    </View>
  );

  const RenderMainContainer = () => (
    <View style={{flex: 1}}>
      {isJobEmpty() ? <RenderEmptyList /> : <RenderList />}
    </View>
  );

  useEffect(() => {
    if (searchInput) {
      const filteredJobs = responseJobList?.filter(job =>
        job.description.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setCurrentPage(1);
      setFilteredJobList(filteredJobs);
    } else {
      setFilteredJobList(responseJobList);
    }
  }, [responseJobList, searchInput]);

  useEffect(() => {
    handlePageJobs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (filteredJobList?.length > 0) {
      handlePageTotal(filteredJobList?.length);
      handlePageJobs(currentPage);
    }
  }, [JSON.stringify(filteredJobList)]);

  useFocusEffect(
    useCallback(() => {
      dispatch(emptyJobList());
      handleFetchingJobList();
    }, []),
  );

  return (
    <Container>
      <Header title="Home" />
      <BoxSpace.B />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by job name"
          value={searchInput}
          onChangeText={handleSearchInputChanged}
          editable={!isJobEmpty()}
          style={styles.input}
        />
      </View>
      <BoxSpace.B />
      <RenderPageHandler />
      <BoxSpace.B />
      <HandleRenderLoading />
    </Container>
  );
};

export default Home;
