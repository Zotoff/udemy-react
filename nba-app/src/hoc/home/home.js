import React from 'react';
import NewsSlider from '../../components/widgets/NewsSlider/slider';
import NewsList from '../../components/widgets/NewsList/newslist';
import VideosList from '../../components/widgets/VideosList/videoslist';

const Home = () => {
    return (
        <div>
            <NewsSlider 
                type="featured"
                start={0}
                amount={3}
                settings={{
                    dots: false
                }}
            />
            <NewsList 
                type="card"
                loadmore={true}
                start={3}
                amount={3}
            />
            <VideosList 
                type="card"
                title={true}
                loadmore={true}
                start={0}
                amount={3}                
            />
        </div>
    )
}

export default Home;