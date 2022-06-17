/** @jsxImportSource @emotion/react */
import { Skeleton, Grid } from "@mui/material"
import AniToolBar from "./AniToolBar";

const AnimeDetailSkeleton = () => {
  return (
    <div css={{ marginTop: 90 }}>
      <AniToolBar hasBackButton title="Anime Detail" />
      <Grid
        container
        css={{
          marginTop: 40,
          padding: 30,
          '@media(min-width: 768px)': {
            paddingLeft: 100
          }
        }}
      >
        <Grid item xs={12} md={6} lg={4}>
          <Skeleton
            variant="rectangular"
            height="60vh"
            animation="wave"
            css={{
              '@media(min-width: 768px)': {
                width: 375
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Skeleton animation="wave" height={75} />
          <div css={{ display: 'flex', gap: 5 }}>
            {
              [...Array(5).keys()].map((v, i) => <Skeleton key={i} animation="wave" variant="circular" width={18} />)
            }
          </div>
          <Skeleton width="30%" />
          <Skeleton width="30%" />
          <Skeleton width="30%" height="10vh" />
          <Skeleton height="30vh" />
        </Grid>
      </Grid>
    </div>
  )
};

export default AnimeDetailSkeleton;