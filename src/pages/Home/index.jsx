import React from 'react'
import { Carousel } from 'antd'
import styles from './index.module.css'
export default function Home() {
  return (
    <Carousel dotPosition='bottom' autoplay >
      <div>
        <div className={styles.container}>
          <img src="https://s2.loli.net/2023/02/19/SMKE4XRbYwe96Uu.jpg" ></img>
          <h3 style={{color:'#fff'}}>每一天都是新的开始</h3>
        </div>
      </div>
      <div>
        <div className={styles.container}>
        <img src="https://s2.loli.net/2023/02/19/xgOSTK5Ae3Pwo1k.png" />
        <h3 style={{color:'#fff'}}>用心解决每一个问题</h3>
        </div>
      </div>
      <div>
        <div className={styles.container}>
          <img src="https://s2.loli.net/2023/02/19/mAI287cybLsOPEM.png" ></img>
        </div>
      </div>
    </Carousel>

  )
}

