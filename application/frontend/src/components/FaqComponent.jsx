import React, { useState } from 'react'
import FAQ from './FAQ'
import "../css/faq.css";

function FaqComponent(faq, index) {
  const [faqs, setFaqs] = useState([
    {
      question: 'What is SYNC?',
      answer: 'SYNC is a music streaming platform linked with Spotify. You can listen and talk to friends and/ or the public to the songs',
      open: false
    },
    {
      question: 'What do I need to use SYNC?',
      answer: 'You need a Spotify Premium Account to be able to access all functionalities of the website.',
      open: false
    },
    {
      question: 'What songs can I listen to on SYNC?',
      answer: 'As long as Spotify has it, you can listen to it!',
      open: false
    },
    {
      question: 'Do I need to pay for anything?',
      answer: 'As long as you have Spotify Premium Account, you do not need to pay for our services!',
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setFaqs(faqs.map((faq, i) => {
      if(i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq
    }))
  }

  return (
    <div className='FaqComponent'>
      <header>
        <h1> Frequently Asked Questions</h1>
      </header>
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  )
}

export default FaqComponent