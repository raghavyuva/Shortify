import React, { useEffect, useState } from 'react';
import ACard from '../components/displayCard/ACard';
import FArticle from '../components/displayCard/FArticle';
import SwipeCard from '../components/displayCard/SwipeCard';
import { url } from '../static/conf';
import Structure from '../utils/structure';

const home = () => {

    const [Article, setArticle] = useState([]);

    const Component = {
        hero: FArticle,
        blogs: ACard,
        swipe: SwipeCard,
    }



    const Data = {
        Article: Article.length >0 ?Article:[],
    }

    useEffect(() => {

        fetchArticles();
        return () => {

        };
    }, []);


    const fetchArticles = () => {
        fetch(`${url}/article`).then(
            (res) => res.json())
            .then((data) => {
                console.log(data);
                if (data?.articles?.length > 0) {
                    setArticle(data?.articles)
                } else {
                    alert("error getting articles")
                }
            })
    }

    return (
        <Structure
            Component={Component}
            Data={Data}
        />
    )
};

export default home;
