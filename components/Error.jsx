import React from 'react'
import Modal from 'funuicss/component/Modal'
import ModalHeader from 'funuicss/component/ModalHeader'
import CloseModal from 'funuicss/component/CloseModal'
import ModalContent from 'funuicss/component/ModalContent'
import ModalAction from 'funuicss/component/ModalAction'
import Button from 'funuicss/component/Button'
import Typography from 'funuicss/component/Typography'
import Icon from 'funuicss/component/Icon'
import RowFlex from 'funuicss/component/RowFlex'
import Div from 'funuicss/component/Div'
export default function ErrorModal({modal  ,  message}) {
  return (
    <div>
      <Modal 
animation="ScaleUp" 
duration={0.4} 
open={true}
backdrop
maxWidth="500px"
>

<ModalContent funcss="padding-20">
    <RowFlex gap="2rem">
        <Div>
        <Div funcss="avatar light-danger" width="40px" height="40px">
        <Icon icon="fas fa-info"  />
        </Div>
        </Div>
        <Div>
            <Typography
            text="Error"
            heading="h4"
            block
            />
            <Typography
            color="secondary"
            text={message ? message : ''}
            block
            />
        </Div>

    </RowFlex>
</ModalContent>
</Modal>
    </div>
  )
}
