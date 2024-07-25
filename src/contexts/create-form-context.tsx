"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { createId } from "@paralleldrive/cuid2"

import { TQuestion } from "@/models/question"
import { TQuestionType } from "@/models/question-type"
import { TForm } from "@/models/form"
import { QuestionService } from "@/services/question-service"

type CreateFormContextType = {
    loadForm: (form: TForm) => void

    questions: TQuestion[]
    updateQuestion: (question: TQuestion) => void
    deleteQuestion: (question: TQuestion) => void
    duplicateQuestion: (question: TQuestion) => void
    addQuestion: (type: TQuestionType) => void

    selectedQuestion?: TQuestion
    selectQuestion: (question: TQuestion) => void

    isSaving: boolean
}

const CreateFormContext = createContext({} as CreateFormContextType)

export function useCreateForm() {
    return useContext(CreateFormContext)
}

export function CreateFormProvider({ children }: { children: ReactNode }) {
    const [form, setForm] = useState<TForm | undefined>(undefined)
    const [questions, setQuestions] = useState<TQuestion[]>([])
    const [selectedQuestion, setSelectedQuestion] = useState<TQuestion | undefined>(undefined)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [autoSave, setAutoSave] = useState<NodeJS.Timeout | null>(null)
    const [shouldSave, setShouldSave] = useState<boolean>(false)

    function loadForm(form: TForm) {
        setForm(form)
        setQuestions(form.questions)
        setSelectedQuestion(form.questions[0])
    }

    useEffect(() => {
        if (!form || !shouldSave) return

        if (autoSave) {
            clearTimeout(autoSave)
            setAutoSave(null)
        }

        if (isSaving) return

        setAutoSave(setTimeout(async () => {
            setIsSaving(true)
            await QuestionService.saveQuestions(form.id, questions)
            setIsSaving(false)
            setShouldSave(false)
        }, 3000))
    }, [questions])

    function updateQuestion(question: TQuestion) {
        if (!form) return

        setSelectedQuestion(question)

        setQuestions(questions.map(q => {
            if (question.id == q.id) {
                return question
            }

            return q
        }))

        setShouldSave(true)
    }

    function deleteQuestion(question: TQuestion) {
        if (!form) return
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

        if (selectedQuestion?.id == question.id) {
            if (question.order == form.questions.length - 1) {
                setSelectedQuestion(form.questions[question.order - 1])
            } else {
                setSelectedQuestion(form.questions[question.order + 1])
            }
        }

        setQuestions(arr)
        setShouldSave(true)
    }

    function duplicateQuestion(question: TQuestion) {
        if (!form) return

        const newQuestion = {
            ...question,
            order: question.order + 1,
            id: createId()
        }

        const arr = questions.map(q => {
            if (q.order > question.order) {
                return {
                    ...q,
                    order: q.order + 1
                }
            }

            return q
        })

        arr.push(question)

        arr.sort((a, b) => a.order - b.order)

        setQuestions(arr)
        setSelectedQuestion(newQuestion)
        setShouldSave(true)
    }

    function addQuestion(type: TQuestionType) {
        if (!form) return

        const question = {
            id: createId(),
            order: questions.length,
            title: "",
            description: "",
            isRequired: false,
            buttonText: "Continue",
            type,
        }

        setQuestions([...questions, question])
        setSelectedQuestion(question)
        setShouldSave(true)
    }

    function selectQuestion(question: TQuestion) {
        setSelectedQuestion(question)
    }

    const value = {
        loadForm,

        questions,
        updateQuestion,
        deleteQuestion,
        duplicateQuestion,
        addQuestion,

        selectedQuestion,
        selectQuestion,

        isSaving
    }

    return (
        <CreateFormContext.Provider value={value}>
            {children}
        </CreateFormContext.Provider>
    )
}