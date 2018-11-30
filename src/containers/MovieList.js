// @flow
import React from "react"

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native"

/*
@Vena - zde si nacitame funkci loadTopRatedMovies ze souboru api.js, kterou jsme si v nem
exportovali, aby byla dostupna zvenci jinym komponentam - pomoci toho export const loadTopRatedMovies
 */
import { loadTopRatedMovies } from "../api"

// components
import { Colors } from "../themes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  listSeparator: {
    width: "86%",
    backgroundColor: "#CED0CE",
    marginTop: "5%",
    marginBottom: "5%",
  },
})

export default class MovieList extends React.PureComponent<null> {
  static navigationOptions = { title: "Home" }

  state = {
    movies: [],
  }

  /*
  @Vena - funkce Reactu - kdyz v libovolny komponente napises tuhle funkci componentDidMount
  presne takto pojmenovanou, tak se automaticky vola pote co se ta komponenta plne nacte
  - v nasem pripade tedy pote co se plne nacte tahle komponenta MovieList.
   */
  componentDidMount() {
    // @Vena - nyni volam fci souboru api.js loadTopRatedMovies - pro nacteni toho seznamu top_rated filmu
    loadTopRatedMovies()
      .then(response => {
        // @Vena - 'then' znamena, ze jsem cekal na odpoved. Tedy program cekal az do doby, nez dostal z API odpoved -> "response" - a nyni s temi daty mohu dal pracovat
        this.setState(
          () => ({
            // @Vena - do stavu komponenty, konkr. do pole "movies" si nastavim odpoved z API -> ta obsahuje pole objektu s vlastnostmi pro dane filmy
            movies: response.data.results,
          }),
        )
      })
  }

  _showDetail = movieId => {
    // @Vena - predal jsem si parametrem do funkce ID filmu - movieId - a poslu ho dale do komponenty pro detail filmu
    this.props.navigation.navigate("Detail", {
      movie: {
        id: movieId, // posilam dal do detail komponenty
      },
    })
  }

  _renderItem = ({ item }) => (
    // @Vena  - item je prave jedna polozka z pole 'movies' - a ja zde chci zobrazit jen nazev filmu - takze pouziju klic objektu "title"
    // a dale pridavam udalost, ze po kliknuti na nazev filmu chci vyvolat funkci showDetail a parametrem predavam ID filmu.
    <Text onPress={() => this._showDetail(item.id)}>{item.title}</Text>
  )

  _keyExtractor = item => `item-${item.id}`

  _renderSeparator = () => <View style={styles.listSeparator}/>

  render() {
    const { movies } = this.state
    // @Vena - do FlatListu pridavam pole 'movies', co mam ulozene ve state komponenty, nicmene - viz renderItem
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={movies}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </SafeAreaView>
    )
  }
}
