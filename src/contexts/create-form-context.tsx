"use client"

import { createContext, ReactNode, useContext, useState } from "react"

import { Question } from "@/models/question"
import { QUESTION_LIST } from "@/_data/questions"

type CreateFormContextType = {
    questions: Question[]
    updateQuestion: (question: Question) => void
    deleteQuestion: (question: Question) => void
    duplicateQuestion: (question: Question) => void

    selectedQuestion: Question
    selectQuestion: (question: Question) => void
}

const CreateFormContext = createContext({} as CreateFormContextType)

export function useCreateForm() {
    return useContext(CreateFormContext)
}

export function CreateFormProvider({ children }: { children: ReactNode }) {
    const [questions, setQuestions] = useState<Question[]>(QUESTION_LIST)
    const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0])

    function updateQuestion(question: Question) {
        setSelectedQuestion(question)
        
        setQuestions(questions.map(q => {
            if (question.id == q.id)
                return question
            
            return q
        }))
    }

    function deleteQuestion(question: Question) {
        setQuestions(questions.filter(q => q.id != question.id))
    }

    function duplicateQuestion(question: Question) {
        const newQuestion = {
            ...question,
            order: questions.length,
            id: "" // CUID() instead.
        }

        setQuestions([...questions, newQuestion])
    }

    function selectQuestion(question: Question) {
        setSelectedQuestion(question)
    }
    
    const value = {
        questions,
        updateQuestion,
        deleteQuestion,
        duplicateQuestion,

        selectedQuestion,
        selectQuestion
    }
    
    return (
        <CreateFormContext.Provider value={value}>
            {children}
        </CreateFormContext.Provider>
    )
}