import axiosLib from "axios"

/*
 @Vena - API key je zpusob "autorizace" vuci zdroji - ty zdroje nize (movie/movieId a movie/top_rated)
 jsou zabezpecene a tim ze zadame tenhle API key (patri Johnovi) to api api.themoviedb.org vi, ze se
 k nemu prihlasuje nekdo znamy.
*/
const API_KEY = "4aa883f95999ec813b8bfaf319f3972b"

/*
@Vena - inicializace "klienta" - vlastne si tim navazujeme spojeni s tim serverem, kde bezi filmove API, abychom
s nim mohli komunikovat a zadat ho o data (to rated filmy, detail filmu apod.)
 */
const axios = axiosLib.create({
  baseURL: "http://api.themoviedb.org/3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

/*
@Vena - nyni uz mame inicializovaneho klienta (ulozili jsme si ho do promenne 'axios') a definujeme si
interceptor. Interceptor je jen "pretizeni" funkce knihovny a zde to mame proto, abychom porad dokola,
kdybychom meli vice requestu na ten server (ten mame jen na top_rated filmy a na detail filmu, takze
to zas tak pracny neni, ale kdyby jich bylo vice...), nemuseli psal za kazdou tu API URL (napr. /movie/top_rated)
jeste ?api_key=${API_KEY}
 */
axios.interceptors.request.use(request => {
  return {
    /*
     // @Vena - ...request = tzv. "spread" operator - predstav si za tim parametrem 'request' objekt a
     ten spread operator nam z toho objektu jako by doplni jeden po druhem vsechny klice, takze v tom
     return {} je diky tomu spread operatoru neco jako url: 'neco', baseUrl: 'neco', cookies: 'neco', atd. atd.
     a my si tim url: `${request.url}?api_key=${API_KEY}`, prepisujeme format te defaultni hodnoty, co je v
     tom request.url -> viz vyse vysvetleni interceptoru
     */
    ...request,
    url: `${request.url}?api_key=${API_KEY}`,
  }
})

export const loadTopRatedMovies = () => {
  /*
  @Vena - GET je HTTP metoda pro ziskani obsahu - tedy my zde jen zadame o data, ktera obsahuji seznam
  nejlepe hodnocenych filmu.
  Ta zadost jde realne na URL: http://api.themoviedb.org/3/movie/top_rated?api_key=4aa883f95999ec813b8bfaf319f3972b
   */
  return axios.get("/movie/top_rated")
}

export const loadMovieDetail = movieId => {
  return axios.get(`/movie/${movieId}`)
}
