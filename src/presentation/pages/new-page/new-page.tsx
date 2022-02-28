import {
  Box,
  Input,
  InputGroup,
  Stack,
  FormLabel
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'

import { AddClinicPayload } from '@/domain/models'
import { AddClinic, LoadAddressByZipCode } from '@/domain/usecases'

import { Container, FormCarousel, SpaceButton, GradientTitle } from '@/presentation/components'

import { formDateOne, formDateTwo } from './new-page.data'
import { clinicValidation } from './new-page-validations'

type Props = {
  loadAddress: LoadAddressByZipCode
  addClinic: AddClinic
}

export const NewPage = ({ loadAddress, addClinic }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddClinicPayload>()

  const formData = [formDateOne, formDateTwo, 'last-item']

  const validateUserData: SubmitHandler<AddClinicPayload> = async (data) => {
    try {
      const isValid = await clinicValidation.validate(data)
      if (isValid) isAddressValid(isValid)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const isAddressValid = async (data: AddClinicPayload) => {
    try {
      const isLocationValid = await loadAddress.load(data.address)
      if (isLocationValid) onSubmit(data)
    } catch (error) {
      toast.error('Your location is not valid')
    }
  }

  const onSubmit = async (data: AddClinicPayload) => {
    try {
      const newAddedClinic = await addClinic.add(data)
      console.log(newAddedClinic)
      if (newAddedClinic) {
        toast.success(`Clinic ${data.name} was added with success`)
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Box>
      <Box w="100%" h="45vh" bg="linear-gradient(to bottom right, #002b54, #1660a5)" />
      <Container>
        <GradientTitle
          position="relative"
          top="-5rem"
          left="2rem"
        >
          Create a new Clinic
        </GradientTitle>
        <Box p="4rem">
          <FormCarousel items={formData}>
            <Stack spacing={3} p="2rem" w="100%" h="100%">
              {formDateOne.map(item => (
                <InputGroup key={uuid()}>
                  <Input
                    type="text"
                    size="lg"
                    placeholder={item.placeholder}
                    {...register(item.name)}
                  />
                  {errors[item.name] && <FormLabel>{errors[item.name]?.message}</FormLabel>}
                </InputGroup>
              ))}
            </Stack>
            <Box>
              {formDateTwo.map(item => (
                <Stack key={uuid()} p="2rem" w="100%" h="100%">
                  <InputGroup>
                    <FormLabel>{item.name}</FormLabel>
                    <Input
                      d="block"
                      size="lg"
                      placeholder={item.placeholder}
                      {...register(item.name)}
                    />
                  </InputGroup>
                </Stack>
              ))}
            </Box>
            <Box p="2rem" w="100%" h="100%">
              <SpaceButton dark onClick={handleSubmit(validateUserData)}>Send</SpaceButton>
            </Box>
          </FormCarousel>
        </Box>
      </Container>
    </Box>
  )
}
