<?php

namespace WillAndJess\Bundle\RespondBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('WillAndJessRespondBundle:Default:index.html.twig');
    }
}