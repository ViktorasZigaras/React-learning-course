updateimport React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './App.scss';
import Pager from './Pager';
import BooksList from './BooksList';
import BooksTypesSelect from './BooksTypesSelect';

const App = () => {
    //
    console.log('App Render')
    const inPage = 10;
    const [sortByPriceOrder, setsortByPriceOrder] = useState(1);
    const [sortByAuthorOrder, setsortByAuthorOrder] = useState(1);
    const [sortByTitleOrder, setsortByTitleOrder] = useState(1);
    const [allBooks, setAllBooks] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [selectType, setSelectType] = useState(0);
    const [nowPage, setNowPage] = useState(1);
    const [booksTypes, setBooksTypes] = useState([]);

    const booksReducer = (books, action) => {
        if ('ADD_ALL' === action.type) {
            setAllBooks([...action.payload]);
            return allBooks.slice(0, inPage);
        }
        if ('PAGE' === action.type) {
            setNowPage(action.payload);
            return allBooks.slice((action.payload -1) * inPage, action.payload* inPage); 
        }
        if ('SORT' === action.type) {
            if ('price' === action.payload) {
                setsortByPriceOrder(sortByPriceOrder * -1);
                const copy = [].concat(books).sort((a, b) => a.price > b.price ? sortByPriceOrder : (-1 * sortByPriceOrder));
                return copy;
            }
            if ('author' === action.payload) {
                setsortByAuthorOrder(sortByAuthorOrder * -1);
                const copy = [].concat(books).sort((a, b) => a.author > b.author ? sortByAuthorOrder : (-1 * sortByAuthorOrder));
                return copy;
            }
            if ('title' === action.payload) {
                setsortByTitleOrder(sortByTitleOrder * -1);
                const copy = [].concat(books).sort((a, b) => a.title > b.title ? sortByTitleOrder : (-1 * sortByTitleOrder));
                return copy;
            }
            return books;
        }
        if ('MAX_PRICE' === action.type) {
            return allBooks.filter(b => b.price <= maxPrice);
        }
        if ('SELECT_TYPE' === action.type ) {
            return allBooks.filter(b => b.type === selectType);
        }
        return books;
    }
    const [books, setBooks] = useReducer(booksReducer, []);

    useEffect(() => {
        if (!localStorage.getItem('booksTypes')) {
            axios.post(`https://in3.dev/knygos/types/`, {})
            .then(response => {
                const b = response.data;
                localStorage.setItem('booksTypes', JSON.stringify(b));
                setBooksTypes(b);
                // getBooks();
            })
            .catch((error) => {
                console.log(error);
                setBooks([]);
            });
        }
        else {
            setBooksTypes(JSON.parse(localStorage.getItem('booksTypes')));
            // getBooks();
        }
        // console.log(booksTypes);
    }, []);

    useEffect(() => {
        axios.post(`https://in3.dev/knygos/`, {})
        .then(response => {
            const books = response.data;
            books.sort((a, b) => a.price > b.price ? 1 : -1);
            console.log(booksTypes);
            books.forEach((book) => {
                booksTypes.forEach((bookType) => {
                    if (book.type === bookType.id) {
                        console.log(bookType);
                        book.typeTitle = bookType.title;
                        // return false;
                    }
                });
            });
            console.log(books);
            setBooks({type: 'ADD_ALL', payload: books});
        })
        .catch((error) => {
            console.log(error);
            setBooks([]);
        });
    }, [booksTypes]);

    const sortBy = (by) => {
        setBooks({type: 'SORT', payload: by});
    }
    const goTo = (p) => {
        setBooks({type: 'PAGE', payload: p});
    }
    const handleMaxPrice = (e) => {
        setMaxPrice(parseInt(e.target.value));
    }
    const handleMaxPriceSlider = (v) => {
        setMaxPrice(parseInt(v));
    }
    const doFilter = () => {
        setBooks({type: 'MAX_PRICE', payload: ''});
        setBooks({type: 'SELECT_TYPE', payload: ''});
    }
    const handleSelectType = (e) => {
        setSelectType(parseInt(e.target.value));
    }

    return (
        <>
            <div className="grid-container">
                <div className="sm-1">
                    <h1>Books Shop <span>page: {nowPage}</span></h1>
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
                    <div onClick={() => sortBy('price')}>By price</div>
                    <div onClick={() => sortBy('title')}>By Title</div>
                    <div onClick={() => sortBy('author')}>By Author</div>
                    <Pager one={inPage} all={allBooks} goto={goTo} />
                </div>
            </div>
            <BooksList books={books} types={booksTypes}/>
        </>
    )
}

export default App;