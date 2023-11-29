

const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col" >
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <h1 className="font-satoshi font-bold text-3xl">AI <span className="orange_gradient">Summify</span></h1>
                <button type='button' onClick={() => window.open("https://linkedin.com/in/dcdahake132001/")} className='black_btn'>
                    About Developer
                </button>
            </nav>
            <h1 className='head_text'>Summerize Articles Using
                <br className='max-md:hidden' />
                <span className='orange_gradient'>OpenAI GPT-4</span>
            </h1>
            <h2 className='desc'>
                Simplify Your Reading!
            </h2>
        </header>
    )
}

export default Hero
