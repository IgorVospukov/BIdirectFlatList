import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState('right');

  const LoadMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (flag === 'left') {
      getDataLeft();
      return;
    }
    getDataRight();
  }, [page]);

  // useEffect(() => {
  // }, [page]);

  // const getData = param => {
  //   if (param === 'right') {
  //     axios
  //       .get(
  //         `https://jsonplaceholder.typicode.com/albums/1/photos?_limit=5&_page=${page}`,
  //       )
  //       .then(response => {
  //         setData([...data, ...response.data]);
  //       });
  //   } else if (param === 'left') {
  //     axios
  //       .get(
  //         `https://jsonplaceholder.typicode.com/albums/1/photos?_limit=5&_page=${page}`,
  //       )
  //       .then(response => {
  //         setData([...response.data, ...data]);
  //       });
  //   }
  // };

  const getDataRight = async () => {
    await axios
      .get(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_limit=5&_page=${page}`,
      )
      .then(response => response.data)
      .then(res => setData([...data, ...res]))
      .catch(e => console.log(e));
  };
  const getDataLeft = async () => {
    await axios
      .get(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_limit=5&_page=${page}`,
      )
      .then(response => response.data)
      .then(res => setData([...res, ...data]))
      .catch(e => console.log(e));
  };

  const onScroll = event => {
    if (event.nativeEvent.contentOffset.x === 0) {
      setFlag('left');
      LoadMoreData();
      return;
    }
    setFlag('right');
  };

  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index: index,
  });
  const renderItem = ({item}) => {
    return (
      <View style={styles.forContainer}>
        <Image style={styles.forimage} source={{uri: item.url}} />
        <Text>{item.title}</Text>
        <Text>{item.id}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          onScroll={onScroll}
          initialScrollIndex={3}
          getItemLayout={getItemLayout}
          data={data}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0}
          onEndReached={LoadMoreData}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderColor: 'red',
    // borderWidth: 5,
  },
  forimage: {
    width: 50,
    height: 50,
  },
  forContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
  },
});

export default App;
