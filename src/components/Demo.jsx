
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: ""
    });

    const [allArticles,setAllArticles]=useState([]);
    const [copied , setCopied] = useState("");

    const [getSummary, {error,isFetching}] = useLazyGetSummaryQuery();

    useEffect(()=>{
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem("articles")
        );
        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage)
        }
    },[]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        //fetch  summary
        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle,...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            console.log(newArticle);
            
        }
    }

    const handleCopy = (copyUrl)=>{
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(()=>setCopied(false),3000);
    }
    return (
        <section className='mt-16 w-full max-w-xl'>
            {/*Search */}
            <div className='flex flex-col w-full gap-2'>
                   {/* link input form code */}
                <form className='relative flex justify-center items-center' onSubmit={handleSubmit} >
                    <img className='absolute left-0 my-2 ml-3 w-5' src={linkIcon} alt="linkIcon" />
                    <input className='url_input peer' required type="url" placeholder='Enter a URL' value={article.url} onChange={(e) => setArticle({ ...article, url: e.target.value })} />
                    <button className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700' type='submit'>➤</button>
                </form>

                {/* browse URL history */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((item,index)=>(
                        <div className='link_card' key = {`link-${index}`} onClick={()=>setArticle(item)}>
                            <div className='copy_btn' onClick={()=>handleCopy(item.url)}>
                                <img className='w-[40%] h-[40%] object-contain' src={
                                    copied===item.url? tick:copy
                                } alt="copy_icon" />
                            </div>
                            <p className='flex-1 font-sathosi text-blue-700 font-medium text-sm truncate '>{item.url}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Result */}
            
            <div className='my-10 max-w-full flex justify-center items-center'>
    {isFetching ? (
        <img className='w-20 h-20 object-contain' src={loader} alt='loader' />
    ) : error ? (
        <p className='font-inter font-bold text-black text-center'>
            something went wrong!
            <br />
            <span className='font-satoshi font-normal text-grey-700'>
                {error?.data?.error}
            </span>
        </p>
    ) : (
        article.summary && (
            <div className='flex flex-col gap-3'>
                <h2 className='font-satoshi font-bold text-grey-600 text-xl'>
                    Article <span className='blue-gradient'>Summary</span>
                </h2>
                <div className='summary_box'>
                    <p className='font-inter font-medium text-sm text-grey-700'>
                        {article.summary}
                    </p>
                </div>
            </div>
        )
    )}
</div>


        </section>
    )
}

export default Demo;