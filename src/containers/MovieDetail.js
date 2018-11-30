// @flow
import React from "react"

import { SafeAreaView, StyleSheet } from "react-native"
import { Text } from "react-native-elements"

/*
@Vena - zde si nacitame funkci loadMovieDetail ze souboru api.js, kterou jsme si v nem
exportovali, aby byla dostupna zvenci jinym komponentam - pomoci toho export const loadMovieDetail
 */
import { loadMovieDetail } from "../api"

// components
import { Colors } from "../themes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
})

export default class MovieDetail extends React.PureComponent<null> {
  static navigationOptions = { title: "Detail" }

  state = {
    movie: null,
  }

  componentDidMount() {
    /*
     @Vena - z MovieList a jeho funkce _showDetail jsem si poslal parametrem objekt movie s klicem ID filmu, tak si ho tady nactu
     a zavolam si funkci pro nacteni detailu filmu podle ID filmu z filmoveho API. A vysledek si ulozim zase do state komponenty
    */
    const { movie } = this.props.navigation.state.params
    loadMovieDetail(movie.id).then(response => {
      this.setState(() => ({
        movie: response.data,
      }))
    })
  }

  render() {
    // @Vena - ze stavu si nacitam detail filmu
    let { movie } = this.state
    /*
    @Vena - a protoze se componentDidMount vola az po funkci render(), tak musim zajistit, aby pri render()
    nebyla hodnota v <Text h3> nedefinovana - to by totiz spadla aplikace
     */
    movie = movie ? movie.title : ""
    return (
      <SafeAreaView style={styles.container}>
        <Text h3>{movie}</Text>
      </SafeAreaView>
    )
  }
}
