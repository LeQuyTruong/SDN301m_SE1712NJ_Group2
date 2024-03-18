import React, { useEffect, useState } from "react";
import { CarouselImg } from "../../components/common/carosel";
import { RoomList } from "../../components/room-service/roomList";
import { BlogList } from "../../components/blog/blogList";
import { RoomService } from "../../services/feService/roomService";
import { ArticleService } from "../../services/feService/articleService";
import { defaultA, defaultB } from "../../common/constant";
import { BookmarkStar } from "react-bootstrap-icons";

const carouselImg = [
	{
		_id: 1,
		avatar: defaultA,
		title: 'Welcome To Deluxe',
		content: 'Hotels & Resorts',
		class: ''
	},
	{
		_id: 2,
		avatar: defaultB,
		title: 'Welcome To Deluxe',
		content: 'Hotels & Resorts',
		class: ''
	},
]

const Home = () =>
{
	document.title = 'Trang chủ';
	const [ rooms, setRooms ] = useState( [] );
	const [ article, setArticle ] = useState( [] );
	useEffect( () =>
	{
		getRooms();
		getArticles();
	}, [] );

	const getRooms = async () =>
	{
		const rs = await RoomService.getDataList( { page: 1, page_size: 6, status: 1 } );
		if ( rs?.status === 200 )
		{
			setRooms( rs?.data?.rooms || [] )
		} else
		{
			setRooms( [] );
		}
	};

	const getArticles = async () =>
	{
		const rs = await ArticleService.getDataList( { page: 1, page_size: 4, status: 1 } );
		if ( rs?.status === 200 )
		{
			setArticle( rs?.data?.articles || [] )
		} else
		{
			setArticle( [] );
		}
	};
	return (
		<React.Fragment>
			<CarouselImg data={carouselImg}/>
			<RoomList data={ rooms } isShowLink={ true } size={3} />
			{
				article && <BlogList title={'Tin tức'} data={ article } isShowLink={ true } />
			}
			
		
		</React.Fragment>
	);
};

export default Home;
