export default function CommentForm() {
  return (
    <div className='w-max-[751px] w-full bg-grey-grey10 py-9 px-11'>
      <div className='flex items-center gap-2 mb-4'>
        <div className='w-[32px] h-[32px] bg-randomProfile-random1 rounded-full flex justify-center items-center font-inter font-medium text-sm text-grey-whiteFixed'>
          SL
        </div>
        <span className='text-sm font-medium font-inter text-grey-grey0'>Samuel Leão</span>
      </div>
      <form>
        <div className='relative'>
          <textarea
            placeholder='Carro muito confortável, foi uma ótima experiência de compra...'
            className='w-full h-32 py-5 text-base font-normal border-2 rounded outline-none resize-none border-grey-grey7 px-7 font-inter text-grey-grey3 decoration-transparent'
          >
          </textarea>
          <button
            type="submit"
            className='absolute z-10 px-5 py-3 text-sm font-semibold rounded right-3 bottom-4 bg-brand-brand1 text-grey-whiteFixed'
          >Comentar</button>
        </div>
      </form>
      <div className='flex gap-2'>
        <span className='px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-grey3 bg-grey-grey7'>Gostei muito!</span>
        <span className='px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-grey3 bg-grey-grey7'>Incrível</span>
        <span className='px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-grey3 bg-grey-grey7'>Recomendarei para meus amigos!</span>
      </div>
    </div>
  );
}