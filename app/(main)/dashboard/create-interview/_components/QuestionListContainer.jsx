import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <div>
        <h2 className='text-xl font-bold text-amber-500 mb-3'>Generated Interview Questions</h2>
        <div className='p-5 border border-gray-300 rounded-xl bg-white'>
            {questionList.map((item, index) => (
                <div key={index} className='p-3 border border-gray-300 rounded-xl mb-3'>
                    <h2 className='font-medium my-2'>{item.question}</h2>
                    <h2 className='text-sm text-amber-600'>Type: {item?.type}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default QuestionListContainer