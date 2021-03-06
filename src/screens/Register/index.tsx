import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';

import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
    LabelMeta,
    LabelRecompensa,
 } from './styles';
import { useAuth } from "../../hooks/auth";

interface FormData {
    name: string;
    amount: string;
}

type NavigationProps ={
    navigate:(screen:string) => void;
}

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('A meta é obrigatória'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
});

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const { user } = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation<NavigationProps>();

    const {
        control, 
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver( schema )
    });

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação');

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria');
        
        const newTransaction= {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@polvvo:transactions_user:${user.id}`;
            const data = await AsyncStorage.getItem(dataKey); 
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Metas');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>
                        Cadastro da meta
                    </Title>

                </Header>

                <Form>
                    <Fields>
                    <LabelMeta> Meta</LabelMeta>
                        <InputForm 
                            name="name"
                            control={control}
                            placeholder="Ex: Nota de Inglês..."
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                    <LabelRecompensa> Recompensa</LabelRecompensa>
                        <InputForm 
                            name="amount"
                            control={control}
                            placeholder="Ex: 20, 50... "
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton 
                                type="up"
                                title="Nova meta"
                                onPress={() => handleTransactionTypeSelect('positive')}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton 
                                type="down"
                                title="Meta não atingida"
                                onPress={() => handleTransactionTypeSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton 
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal} 
                        />
                    </Fields>

                    <Button 
                        title="Adicionar meta" 
                        onPress={handleSubmit(handleRegister)}
                    />

                </Form>
                
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}