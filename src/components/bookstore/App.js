import React, {useState, useEffect, useReducer, memo, useCallback} from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './App.scss';


const App = () => {
    console.log('App Render')

    const inPage = 5;

    
    // const [sortByPriceOrder, setsortByPriceOrder] = useState(1);
    // const [sortByAuthorOrder, setsortByAuthorOrder] = useState(1);
    // const [sortByTitleOrder, setsortByTitleOrder] = useState(1);


    const [sortOrderDir, setsortOrderDir] = useState(-1);
    const [sortOrder, setsortOrder] = useState('title');

    
    const [maxPrice, setMaxPrice] = useState(0);

    const [selectType, setSelectType] = useState(0);

    const [nowPage, setNowPage] = useState(1);

    const [booksTypes, setBooksTypes] = useState([]);

    const [ticTac, setTicTac] = useState(Date.now());
    const [ticTac1, setTicTac1] = useState(Date.now());



   
    
    



    const booksLikeNewReducer = (booksLikeNew, action) => {
        if('UPDATE' === action.type) {
            return [...booksLikeNew, action.payload].filter((v, i, a) => a.indexOf(v) === i);
        }
        return booksLikeNew;
    }
    const [booksLikeNew, setBooksLikeNew] = useReducer(booksLikeNewReducer, []);


    const booksDislikeNewReducer = (booksDislikeNew, action) => {
        if('UPDATE' === action.type) {
            return [...booksDislikeNew, action.payload].filter((v, i, a) => a.indexOf(v) === i);
        }
        return booksDislikeNew;
    }
    const [booksDislikeNew, setBooksDislikeNew] = useReducer(booksDislikeNewReducer, []);

    const booksLikeReducer = (booksLike, action) => {

        if('ADD_LIKES' === action.type) {
            return action.payload;
        }

        if('CLICK_LIKE' === action.type) {
            let likes;
            const id = action.payload;
            if (booksLike.includes(id)) {
                likes = booksLike.filter(l => l !== id);
                setBooksDislikeNew({type: 'UPDATE', payload: id});
                console.log('dislike', id, booksDislikeNew);
            }
            else {
                likes = [...booksLike, id];
                setBooksLikeNew({type: 'UPDATE', payload: id});
                console.log('like', id, booksLikeNew);
            }
            localStorage.setItem('booksLike', JSON.stringify(likes));
            return likes;
        }
        return booksLike;
    }
    const [booksLike, setBooksLike] = useReducer(booksLikeReducer, []);





    const allBooksReducer = (allBooks, action) => {

        if('ADD_ALL' === action.type) {
            return action.payload;
        }

        if('UPDATE' === action.type) {
            const all = [...allBooks];
            const newBooks = action.payload;
            let tempBook;
              all.forEach((book, key) => {
                tempBook = newBooks.filter(b => b.id === book.id);
                if (tempBook.length) {
                    all[key] = tempBook[0];
                }
            });
            // console.log('all', all);
            return all;
        }

        return allBooks;
    }

    const [allBooks, setAllBooks] = useReducer(allBooksReducer, []);

    const booksReducer = (books, action) => {

        if('SHOW_FIRST_PAGE' === action.type) {
            return allBooks.slice(0, inPage);
        }


        if('PAGE' === action.type) {
            setNowPage(action.payload);
            return allBooks.slice((action.payload -1) * inPage, action.payload* inPage); 
        }
        if('SORT' === action.type) {

            if (sortOrder === action.payload) {
                setsortOrderDir(sortOrderDir * -1);
            }
            else {
                setsortOrderDir(1);
            }

            if ('price' === action.payload) {

                const copy = [].concat(books).sort((a, b) => a.price > b.price ? sortOrderDir : (-1 * sortOrderDir))
                return copy;
            }
            if ('author' === action.payload) {

                const copy = [].concat(books).sort((a, b) => a.author > b.author ? sortOrderDir : (-1 * sortOrderDir))
                return copy;
            }
            if ('title' === action.payload) {

                const copy = [].concat(books).sort((a, b) => a.title > b.title ? sortOrderDir : (-1 * sortOrderDir))
                return copy;
            }
            return books;
        }
        if('MAX_PRICE' === action.type) {
            return allBooks.filter(b => b.price <= maxPrice)
        }
        if('SELECT_TYPE' === action.type ) {
            if (!selectType) {
                return allBooks;
            }
             
            return allBooks.filter(b => b.type === selectType)
        }

        // if('UPDATE' === action.type) {

        // }

        return books;
    }

    const [books, setBooks] = useReducer(booksReducer, []);

    useEffect(() => {
        axios.post(`https://in3.dev/knygos/`, {})
        .then(response => {
            const b = response.data;
            b.sort((a, b) => a.price > b.price ? 1 : -1);

            // localStorage.setItem('allBooks', JSON.stringify(b));
            // console.log(JSON.parse(localStorage.getItem('allBooks')));

            // console.log(b);
            setAllBooks({type: 'ADD_ALL', payload: b});
            setBooks({type: 'SHOW_FIRST_PAGE'});
            
        })
        .catch(error => {
            setBooks([]);
        });
    }, []);


    useEffect(() => {
        if (!localStorage.getItem('booksTypes')) {

            axios.post(`https://in3.dev/knygos/types/`, {})
            .then(response => {
                const b = response.data;
                localStorage.setItem('booksTypes', JSON.stringify(b));
                setBooksTypes(b);
            })
            .catch(error => {
            
            });
        }
        else {
            setBooksTypes(JSON.parse(localStorage.getItem('booksTypes')));
        }
    }, []);


    useEffect(() => {

        axios.post(`https://in3.dev/knygos/data/`, {}, {withCredentials: true})
        .then(response => {
            const likes = response.data.data.likes;
            setBooksLike({type: 'ADD_LIKES', payload: likes});
            localStorage.setItem('booksLike', JSON.stringify(likes));
        })
        .catch(error => {
        
        });
    }, []);


    // useEffect(() => {
    const customTimer = () => {
        console.log('timer', booksLikeNew, booksDislikeNew, booksLikeNew.length, booksDislikeNew.length);
        console.log(this);
        if (booksLikeNew.length + booksDislikeNew.length) {
            const D = {};
            D.data = {};
            D.data.likes = {};
            D.data.likes.add = booksLikeNew;
            D.data.likes.remove = booksDislikeNew;
            setBooksLikeNew([]);
            setBooksDislikeNew([]);
            console.log('timer inside');

            const copy = {};
            copy.booksLikeNew = [...booksLikeNew];
            copy.booksDislikeNew = [...booksDislikeNew];

            console.log('out', JSON.stringify(D))

            axios.post(`https://in3.dev/knygos/sync/`, D, {withCredentials: true})
            .then(response => {
                if ('ok' === response.data.message) {
                    console.log("Response", response.data.message);
                }
            })
            .catch(error => {
                    // let update;
                    // update = [...booksDislikeNew, ...copy.booksDislikeNew].filter((v, i, a) => a.indexOf(v) === i);
                    // setBooksDislikeNew(update);
                    // update = [...booksLikeNew, ...copy.booksLikeNew].filter((v, i, a) => a.indexOf(v) === i);
                    // setBooksLikeNew(update);
            });
                        

            console.log("SYNC", D);
        }


    };


    useEffect(() => {
        axios.post(`https://in3.dev/knygos/`, {time:(Math.round(ticTac1/1000))-2})
        .then(response => {
            // console.log("SERVER", response.data)
            // console.log("CLIENT", Math.round(ticTac1/1000))
            if (response.data.length) {
               setAllBooks({type: 'UPDATE', payload: response.data})
            }
        })
    }, [ticTac1]);




    useEffect(() => {
        const timerId = setInterval(
            () => customTimer()// setTicTac(Date.now()),
            ,3555
        );
        
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    useEffect(() => {
        const timerId = setInterval(
            () => setTicTac1(Date.now()),
            3555
        );
        
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);


    const sortBy = by => {
        setBooks({type: 'SORT', payload: by});
        setsortOrder(by);
    }

    const goTo = p => {
        if (!p) {
            return;
        }
        setBooks({type: 'PAGE', payload: p})
    }

    const handleMaxPrice = e => {
        setMaxPrice(parseInt(e.target.value));
    }
    const handleMaxPriceSlider = v => {
        setMaxPrice(parseInt(v));
    }

    const doFilter = () => {
        setBooks({type: 'MAX_PRICE', payload: ''});
        setBooks({type: 'SELECT_TYPE', payload: ''});
    }

    const handleSelectType = e => {
         setSelectType(parseInt(e.target.value));
    }

    const likeIt = useCallback( id => {


        setBooksLike({type: 'CLICK_LIKE', payload: id});


    },[])



    return (
        <div>
            <svg className="none">
                        
            <symbol id="Layer_1" enableBackground="new 0 0 512 512" viewBox="0 0 512 512"><g><g><path d="m255.993 426.5c-1.607 0-3.229-.482-4.638-1.487-3.598-2.565-4.434-7.561-1.869-11.158l105.596-148.09c2.565-3.597 7.562-4.435 11.158-1.869 3.598 2.565 4.434 7.561 1.869 11.158l-105.596 148.09c-1.56 2.189-4.022 3.356-6.52 3.356z"/></g><g><g><path d="m256 489c-128.477 0-233-104.523-233-233s104.523-233 233-233 233 104.523 233 233-104.523 233-233 233zm0-450c-119.654 0-217 97.346-217 217s97.346 217 217 217 217-97.346 217-217-97.346-217-217-217z"/></g><g><path d="m256 426.5c-4.418 0-8-3.582-8-8v-296.17c0-4.418 3.582-8 8-8s8 3.582 8 8v296.17c0 4.418-3.582 8-8 8z"/></g><g><path d="m256.007 426.5c-2.499 0-4.959-1.167-6.521-3.356l-105.596-148.09c-2.565-3.597-1.729-8.593 1.869-11.158s8.593-1.729 11.158 1.869l105.596 148.09c2.565 3.597 1.729 8.593-1.869 11.158-1.408 1.005-3.03 1.487-4.637 1.487z"/></g></g></g></symbol>
            <symbol id="like" data-name="Layer 2"viewBox="0 0 24 24"><path d="M19.782,9H15.388l.863-2.592a3.9,3.9,0,0,0-1.532-4.464,2.447,2.447,0,0,0-3.341.63l-4.693,6.7A.993.993,0,0,0,6,9H2a1,1,0,0,0-1,1V22a1,1,0,0,0,1,1H6a1,1,0,0,0,1-1v-.132l1.445.964A1.006,1.006,0,0,0,9,23h9a1,1,0,0,0,.895-.553l3.658-7.317A4.264,4.264,0,0,0,23,13.236V12.218A3.222,3.222,0,0,0,19.782,9ZM5,21H3V11H5Zm16-7.764a2.255,2.255,0,0,1-.236,1L17.382,21H9.3L7,19.465v-7.15L13.017,3.72a.43.43,0,0,1,.593-.112,1.893,1.893,0,0,1,.744,2.168l-1.3,3.908A1,1,0,0,0,14,11h5.782A1.219,1.219,0,0,1,21,12.218Z"/></symbol>
            <symbol id="heart" enableBackground="new 0 0 512 512" viewBox="0 0 512 512"><path d="m376 43.839c-60.645 0-99.609 39.683-120 75.337-20.391-35.654-59.355-75.337-120-75.337-76.963 0-136 58.945-136 137.124 0 84.771 73.964 142.5 184.413 229.907 54.082 42.761 57.557 46.011 71.587 57.29 11.45-9.205 17.787-14.751 71.587-57.29 110.449-87.407 184.413-145.136 184.413-229.907 0-78.178-59.037-137.124-136-137.124z"/></symbol>
            
            </svg>
            <div className="grid-container">
            <div className="sm-1">
            <h1>Books Shop</h1>
            </div>
            <div className="sm-1">
                <div className="grid-container">
                    <div className="sm-1-2">
                        <div className="filter">
                            <h4>Knygų kaina iki:</h4>
                            <input type="text" onChange={handleMaxPrice} value={maxPrice}/>
                            <Slider
                                value={maxPrice}
                                orientation="horizontal"
                                onChange={handleMaxPriceSlider}
                            />
                            <hr/>
                            <h4>Pasirinkti kategoriją:</h4>
                            <BooksTypesSelect types={booksTypes} handleSelectType={handleSelectType} selectType={selectType}/>
                            <button type="button" onClick={doFilter}>Filtruoti</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm-1 sort">
            <div onClick={() => sortBy('price')}>
                <ActiveSorter 
                text="By price" 
                type="price" 
                sortOrder={sortOrder} 
                sortOrderDir={sortOrderDir}
                />
            </div>
            <div onClick={() => sortBy('title')}>
                <ActiveSorter 
                text="By Title" 
                type="title" 
                sortOrder={sortOrder} 
                sortOrderDir={sortOrderDir}
                />
            </div>
            <div onClick={() => sortBy('author')}>
                <ActiveSorter 
                text="By Author" 
                type="author" 
                sortOrder={sortOrder} 
                sortOrderDir={sortOrderDir}
                />
            </div>
            <Pager one={inPage} all={allBooks} goto={goTo} nowPage={nowPage} />
            </div>
            </div>
            <BooksList books={books} types={booksTypes} likeIt={likeIt} booksLike={booksLike}/>
        </div>
    )
}

const Sorter = ({text, setClass}) => {
    return (
        <span className={setClass + ' sorter'}>
            <b>{text}</b>
            <svg>
            <use xlinkHref="#Layer_1"></use>
            </svg>
        </span>
    )
}

const withActiveSorter = (Component) => (props) => {
    if (props.sortOrder === props.type) {
        if (props.sortOrderDir === 1) {
            return <Component setClass="active up" {...props}/>
        }
        else {
            return <Component setClass="active down" {...props}/>
        }
    }
    return <Component setClass="pasive" {...props}/>
}

const ActiveSorter = withActiveSorter(Sorter);



const Pager = ({one, all, goto, nowPage}) => {
    const pages = Array(Math.ceil(all.length/one)).fill(null);
    return (
        <span>
            {
                pages.map((nothing, page) => (
                <ActivePage key={page+1} page={page+1} nowPage={nowPage} goto={goto} />
                ))
            }
        </span>
    )
}

const Page = ({page, goto, gotoPage, setClass}) => {
    return <span className={setClass} onClick={() => goto(gotoPage)}>Page {page}</span>
}


const withActivePage = (Component) => (props) => {
    // console.log(props);
    if (props.nowPage === props.page) {
        return <Component setClass="pasive" {...props} gotoPage={0} />
    }
    return <Component setClass="active" {...props} gotoPage={props.page} />
}

const ActivePage = withActivePage(Page);


const BooksList = memo( ({books, types, likeIt, booksLike}) => {
    console.log('BooksList render');
    return (
        <div className="grid-container">
        {
            books.map(book => (
                <Book key={book.id} book={book} types={types} likeIt={likeIt} booksLike={booksLike} />
            ))
        }
        </div>
    )
})

const Heart =({bookId, booksLike}) => {
    if (booksLike.includes(bookId)) {
        return (
            <span>
            <svg>
                <use xlinkHref="#heart"></use>
            </svg>
        </span>
        )
    }
    return <></>
}
const Like = ({likeIt, bookId, booksLike}) => {
    let style = 'like-button';
    if (booksLike.includes(bookId)) {
        style = style + ' dislike';
    }
    return(
        <span className={style} onClick={() => likeIt(bookId)}>
            <svg>
                <use xlinkHref="#like"></use>
            </svg>
        </span>
        )
}
const Book = ({book, types, likeIt, booksLike}) => {
 
    return (
        <div className="sm-1 md-1-2 lg-1-3">
            <div className="book">
                <h2>{book.title}
                <Heart bookId={book.id} booksLike={booksLike} />
                </h2>
                <h4>{book.author}</h4>
                <img src={book.img} alt={book.title} />
                <p>{types.filter(t => t.id === book.type)[0].title}</p>
                <span>{book.price} EUR</span>
                <Like bookId={book.id} likeIt={likeIt} booksLike={booksLike}/>
            </div>
        </div>
    )
    
}
const BooksTypesSelect = ({types, handleSelectType, selectType}) => {
    return (
        <select onChange={handleSelectType} value={selectType}>
        <option key={0} value={0}>Nieko nepasirinkta</option>
            {
            types.map(type => (
                <option key={type.id} value={type.id}>{type.title}</option>
            ))
            }
        </select>
    )
}
export default App;