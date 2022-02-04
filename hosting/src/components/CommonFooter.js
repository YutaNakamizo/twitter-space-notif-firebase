import React from 'react';
import {
  Box,
  Paper,
  Divider,
  Container,
  Typography,
  Link,
} from '@mui/material';

export const CommonFooter = ({
  ...props
}) => {
  return (
    <Box
      component="footer"
      {...props}
    >
      <Divider
      />

      <Box
        pt={2}
        pb={2}
      >
        <Container
          maxWidth="md"
        >
          <Box
            mb={2}
          >
            <Paper
            >
              <Box
                p={2}
              >
                <Typography
                  variant="caption"
                  component="p"
                  align="center"
                >
                  くじスペ通知 bot は現在ベータテスト段階です.
                </Typography>
                <Typography
                  variant="caption"
                  component="p"
                  align="center"
                >
                  お気付きの点があれば, 些細なことでも構いませんので不具合や改善要望などの&nbsp;
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfpuXj-S-NI90JgizARWlgt537XRQGOhpZqr-DGS9oAplL3WQ/viewform?usp=sf_link"
                    target="_blank"
                  >
                    フィードバック
                  </Link>
                  &nbsp;を送信し, サービスの改善にご協力ください.
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Typography
            variant="caption"
            component="p"
            align="center"
          >
            キービジュアル: YuukaUta (
            <Link
              href="https://twitter.com/YuukaUta"
              target="_blank"
            >
              Twitter
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="https://www.pixiv.net/users/24360209"
              target="_blank"
            >
              pixiv
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="https://skeb.jp/@YuukaUta"
              target="_blank"
            >
              Skeb
            </Link>
            )
          </Typography>

          <Typography
            variant="caption"
            paragraph
            align="center"
          >
            この Web サイトおよび通知システムは&nbsp;
            <Link
              href="https://ggtk.app"
              target="_blank"
            >
              Stardust Sorcery
            </Link>
            &nbsp;/&nbsp;
            <Link
              href="https://ggtk.dev"
              target="_blank"
            >
              Yuta NAKAMIZO
            </Link>
            &nbsp;が管理・運営するファンサイト, ファンコンテンツの 1 つです.
          </Typography>

          <Typography
            variant="caption"
            paragraph
            align="center"
          >
            <Link
              href="https://ggtk.app/contacts"
              target="_blank"
            >
              お問い合わせ
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="https://ggtk.app/privacy"
              target="_blank"
            >
              プライバシーポリシー
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

