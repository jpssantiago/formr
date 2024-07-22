"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { createId } from "@paralleldrive/cuid2"

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
        if (questions.length == 1) return
        
        const arr = questions.filter(q => q.id != question.id).map(q => {
            if (q.order >= question.order) {
                return {
                    ...q,
                    order: q.order - 1
                }
            }
            
            return q
        })

        setQuestions(arr)
    }

    function duplicateQuestion(question: Question) {
        const newQuestion = {
            ...question,
            order: question.order + 1,
            id: createId()
        }

        const arr = [...questions.map(q => {
            if (q.order > question.order) {
                return {
                    ...q,
                    order: q.order + 1
                }
            }

            return q
        }), newQuestion]

        arr.sort((a, b) => a.order - b.order)

        setQuestions(arr)
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