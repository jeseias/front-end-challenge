import { Box, Grid, Heading } from '@chakra-ui/react'

import { Clinic as ClinicProps } from '@/domain/models'

import { Clinic } from '@/presentation/components'

type Props = {
  clinics: ClinicProps[]
}

export const HomeClinicsSection = ({ clinics }: Props) => {
  return (
    <Box bg="blackAlpha.200" color="gray.900" textAlign="center" p="6rem 0">
      <Box maxWidth="142rem" m="0 auto">
        <Heading fontSize="4rem">Procure pela Clinica mais perto de si.</Heading>
        <Grid
          gridTemplateColumns={['1fr 1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr']}
          gap="2rem"
          mt="4rem"
        >
          {clinics.map(clinic => <Clinic key={clinic.id} {...clinic}/>)}
        </Grid>
      </Box>
    </Box>
  )
}
